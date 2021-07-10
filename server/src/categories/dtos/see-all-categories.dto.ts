import { Category } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';

export class SeeAllCategoriesOutput extends CoreOutput {
  @IsArray()
  categories?: Category[];
}
