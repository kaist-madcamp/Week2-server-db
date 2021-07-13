import { CoreOutput } from './../../common/dtos/output.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class EditPostInput {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  contents?: string;

  @IsNumber()
  @IsOptional()
  categoryId?: number;
}

export class EditPostOutput extends CoreOutput {}
