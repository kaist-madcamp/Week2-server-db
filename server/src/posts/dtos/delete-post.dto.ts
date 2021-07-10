import { CoreOutput } from './../../common/dtos/output.dto';
import { IsString } from 'class-validator';

export class DeletePostInput {
  @IsString()
  id: string;
}

export class DeletePostOutput extends CoreOutput {}
