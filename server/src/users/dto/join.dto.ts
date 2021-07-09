import { IsString } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';

export class JoinInput {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

export class JoinOutput extends CoreOutput {}
