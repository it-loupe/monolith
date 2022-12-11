import { Module } from '@nestjs/common';
import { TopicModule } from './modules/topic/topic.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from '~config';

console.log(config);

@Module({
  imports: [MongooseModule.forRoot(config.mongodb_url, {}), TopicModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
