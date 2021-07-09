import { IsString } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';

export class LoginInput {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class LoginOutput extends CoreOutput {
  @IsString()
  token?: string;
}
