import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get(':topicName')
  findOne(@Param('topicName') topicName: string) {
    return this.topicService.findOne(topicName);
  }
}
