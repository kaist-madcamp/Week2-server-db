import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';

export class SearchPostsByQueryOutput extends CoreOutput {
  posts?: PartialPost[];
}

export class PartialPost {
  @IsNumber()
  id: number;

  @IsString()
  title: string;
}
