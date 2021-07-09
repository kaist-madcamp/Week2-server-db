import { CoreOutput } from './../../common/dtos/output.dto';
import { IsArray, IsString } from 'class-validator';

export class CreatePostInput {
  @IsString()
  title: string;

  @IsString()
  contents?: string;

  @IsArray()
  cateogry: string[];
}

export class CreatePostOutput extends CoreOutput {}
