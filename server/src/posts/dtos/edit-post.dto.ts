import { CoreOutput } from './../../common/dtos/output.dto';
import { IsOptional, IsString } from 'class-validator';

export class EditPostInput {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  categoryName?: string;
}

export class EditPostOutput extends CoreOutput {}
