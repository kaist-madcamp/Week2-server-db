import { Post } from '@prisma/client';
import { CoreOutput } from './../../common/dtos/output.dto';

export class FindPostByIdInput {
  id: string;
}

export class FindPostByIdOutput extends CoreOutput {
  post?: Post;
}
