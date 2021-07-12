import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class CreateCommentInput {
  @IsNumber()
  postId: number;

  @IsString()
  payload: string;
}

export class CreateCommentOutput extends CoreOutput {}
