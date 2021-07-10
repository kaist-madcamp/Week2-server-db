import { Post } from '@prisma/client';
import { CoreOutput } from './../../common/dtos/output.dto';

export class FindPostsByCategoryInput {
  categoryId: string;
}

export class FindPostsByCategoryOutput extends CoreOutput {
  posts?: Post[];
}
