import { CoreOutput } from './../../common/dtos/output.dto';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostInput {
  @IsString()
  title: string;

  @IsString()
  contents?: string;

  @IsNumber()
  categoryId: number;
}

export class CreatePostOutput extends CoreOutput {}
