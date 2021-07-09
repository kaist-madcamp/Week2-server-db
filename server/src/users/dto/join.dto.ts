import { IsString } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';

export class JoinInput {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}

export class JoinOutput extends CoreOutput {}
