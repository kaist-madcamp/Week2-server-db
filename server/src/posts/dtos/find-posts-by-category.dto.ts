import { Post } from '@prisma/client';
import { CoreOutput } from './../../common/dtos/output.dto';

export class FindPostsByCategoryOutput extends CoreOutput {
  posts?: Post[];
}
