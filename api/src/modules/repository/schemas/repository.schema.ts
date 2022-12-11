import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RepositoryDocument = HydratedDocument<Repository>;

@Schema()
export class Repository {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  url: string;

  @Prop()
  isForked: boolean;

  @Prop()
  isArchived: boolean;

  @Prop()
  language: string;

  @Prop()
  topics: string[];

  @Prop()
  starsCount: number;

  @Prop()
  watchersCount: number;

  @Prop()
  forksCount: number;

  @Prop()
  openIssuesCount: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RepositorySchema = SchemaFactory.createForClass(Repository);
