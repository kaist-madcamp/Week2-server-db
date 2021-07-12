import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class EditCommentInput {
  @IsString()
  payload: string;

  @IsNumber()
  postId: number;
}

export class EditCommentOutput extends CoreOutput {}
