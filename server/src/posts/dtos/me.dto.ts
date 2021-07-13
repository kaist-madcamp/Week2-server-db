import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class MeOutput extends CoreOutput {
  @IsNumber()
  @IsOptional()
  postNum?: number;

  @IsNumber()
  @IsOptional()
  commentNum?: number;

  @IsNumber()
  @IsOptional()
  likeNum?: number;

  @IsString()
  @IsOptional()
  username?: string;
}
