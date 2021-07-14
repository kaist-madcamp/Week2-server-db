import { Post } from '@prisma/client';
import { CoreOutput } from './../../common/dtos/output.dto';

export class FindPostByIdOutput extends CoreOutput {
  post?: Partial<Post>;
}
