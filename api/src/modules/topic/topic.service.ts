import { Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';
import { Topic, TopicDocument } from './schemas/topic.schema';
import config from '~config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopicDto } from './dto/create-topic.dto';
import { Repository, RepositoryDocument } from '../repository/schemas/repository.schema';
import { getTopicsFrequency } from './topic.utils';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name) private readonly topicModel: Model<TopicDocument>,
    @InjectModel(Repository.name) private readonly repositoryModel: Model<RepositoryDocument>,
  ) {}

  async findOne(topicName: string) {
    // Check existing topic and repositories
    let topic: TopicDocument = await this.topicModel
      .findOne({ name: topicName })
      .select(['-__v', '-_id'])
      .then((el) => el);
    const repos: RepositoryDocument[] = await this.repositoryModel
      .find({ topics: topicName })
      .select(['-__v', '-_id'])
      .then((el) => el);

    const topicsForAnalyze = [];
    for (const repo of repos) {
      topicsForAnalyze.push(...repo.topics);
    }

    if (!topic) {
      const octokit = new Octokit({ auth: config.github_token });
      const response = await octokit.request(
        `GET /search/repositories?q=topic:{topic}&sort=stars&order=desc&per_page=1`,
        {
          topic: topicName,
        },
      );

      // try {
      //   // ts-ignore
      //   const data = await octokit.paginate('GET /search/repositories?q=topic:{topic}&sort=stars&order=desc&per_page=10', {
      //     topic: topicName,
      //   });
      //   return data;
      // } catch (e) {
      //   console.log(e)
      // }

      let starsCount = 0;
      let watchersCount = 0;
      let openIssuesCount = 0;
      for (const repo of response.data.items) {
        const createRepositoryDto = {
          name: repo.full_name,
          description: repo.description,
          url: repo.html_url,
          isForked: repo.fork,
          isArchived: repo.archived,
          language: repo.language,
          topics: repo.topics,
          starsCount: repo.stargazers_count,
          watchersCount: repo.watchers_count,
          forksCount: repo.forks_count,
          openIssuesCount: repo.open_issues_count,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
        };
        topicsForAnalyze.push(...repo.topics);
        starsCount += repo.stargazers_count;
        watchersCount += repo.watchers_count;
        openIssuesCount += repo.open_issues_count;
        await this.repositoryModel
          .findOne({ name: createRepositoryDto.name })
          .then(async (el) => el || (await this.repositoryModel.create(createRepositoryDto)));
      }

      const createTopicDto: CreateTopicDto = {
        name: topicName,
        repositories: response.data.total_count,
        analyzedRepositories: response.data.items.length,
        stars: starsCount,
        watchers: watchersCount,
        openIssues: openIssuesCount,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      topic = await this.topicModel
        .findOne({ name: topicName })
        .then(async (el) => el || (await this.topicModel.create(createTopicDto)));
    }

    const topicFrequencySorted = getTopicsFrequency(topicsForAnalyze);

    return {
      name: topic.name,
      repositories: topic.repositories,
      analyzedRepositories: topic.analyzedRepositories,
      stars: topic.stars,
      watchers: topic.watchers,
      openIssues: topic.openIssues,
      updatedAt: topic.updatedAt,
      topics: topicFrequencySorted,
    };


  }
}
