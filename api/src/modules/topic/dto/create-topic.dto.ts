export class CreateTopicDto {
  readonly name: string;
  readonly repositories: number;
  readonly analyzedRepositories: number;
  readonly stars: number;
  readonly watchers: number;
  readonly openIssues: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
