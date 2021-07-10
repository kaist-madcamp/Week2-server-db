import { CoreOutput } from './../../common/dtos/output.dto';
import { IsString } from 'class-validator';

export class CreatePostInput {
  @IsString()
  title: string;

  @IsString()
  subtitle?: string;

  @IsString()
  categoryName: string;
}

export class CreatePostOutput extends CoreOutput {}
