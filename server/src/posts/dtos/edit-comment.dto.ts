import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

export class EditCommentInput {
  @IsString()
  payload: string;
}

export class EditCommentOutput extends CoreOutput {}
