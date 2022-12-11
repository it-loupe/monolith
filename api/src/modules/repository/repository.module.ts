import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Repository, RepositorySchema } from './schemas/repository.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Repository.name, schema: RepositorySchema }])],
  controllers: [],
  providers: [],
})
export class RepositoryModule {}
