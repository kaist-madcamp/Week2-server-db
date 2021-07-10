import { CoreOutput } from './../../common/dtos/output.dto';
import { IsString } from 'class-validator';

export class EditPostInput {
  @IsString()
  title?: string;

  @IsString()
  contents?: string;

  @IsString()
  categoryName?: string;
}

export class EditPostOutput extends CoreOutput {}
