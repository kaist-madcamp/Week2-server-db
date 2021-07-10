import { IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';

export class CreateCategoryInput {
  @IsString()
  categoryName: string;
}

export class CreateCategoryOutput extends CoreOutput {}
