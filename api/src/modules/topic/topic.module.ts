import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, TopicSchema } from './schemas/topic.schema';
import { Repository, RepositorySchema } from '../repository/schemas/repository.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }]),
    MongooseModule.forFeature([{ name: Repository.name, schema: RepositorySchema }]),
  ],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
