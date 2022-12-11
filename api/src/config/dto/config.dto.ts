import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ConfigDto {
  @IsInt()
  @Type(() => Number)
  readonly port: number;

  @IsString()
  readonly mongodb_url: string;

  @IsString()
  readonly rabbitmq_url: string;

  @IsString()
  readonly github_token: string;

  @IsString()
  readonly stackoverflow_token: string;
}
