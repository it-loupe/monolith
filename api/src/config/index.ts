import * as dotenv from 'dotenv';
dotenv.config();
import * as untyped from 'config';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { ConfigDto } from './dto/config.dto';

const config: ConfigDto = plainToInstance(ConfigDto, untyped);

const errors: ValidationError[] = validateSync(config);
if (errors.length) {
  console.error('Config validation error');
  errors.forEach((error: ValidationError) => {
    console.error(error.toString());
  });
  console.warn('Process will now exit');
  process.exit(1);
}

export default config;
