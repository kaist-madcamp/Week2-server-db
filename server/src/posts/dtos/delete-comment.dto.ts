import { CoreOutput } from './../../common/dtos/output.dto';
import { IsNumber } from 'class-validator';

export class DeleteCommentInput {
  @IsNumber()
  commentId: number;
}

export class DeleteCommentOutput extends CoreOutput {}
