import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopicDocument = HydratedDocument<Topic>;

@Schema()
export class Topic {
  @Prop({ unique: true })
  name: string;

  @Prop()
  repositories: number;

  @Prop()
  analyzedRepositories: number;

  @Prop()
  stars: number;

  @Prop()
  watchers: number;

  @Prop()
  openIssues: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
