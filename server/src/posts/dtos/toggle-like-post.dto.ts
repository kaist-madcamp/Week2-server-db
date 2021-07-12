import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';

export class ToggleLikeOutput extends CoreOutput {
  @IsNumber()
  @IsOptional()
  likes?: number;
}
