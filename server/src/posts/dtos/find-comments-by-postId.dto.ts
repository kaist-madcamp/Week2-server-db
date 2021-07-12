import { Comment } from '@prisma/client';
import { CoreOutput } from './../../common/dtos/output.dto';

export class FindCommentsByPostIdOutput extends CoreOutput {
  comments?: Comment[];
}
