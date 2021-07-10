import { IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';

export class KakaoAuthInput {
  @IsString()
  username: string;

  @IsString()
  email: string;
  
  @IsString()
  kakaoId: string;
}

export class KakaoAuthOutput extends CoreOutput {
  @IsString()
  token?: string;
}
