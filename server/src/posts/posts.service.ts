import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createPost(
    createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    try {
      const post = await this.prismaService.post.create({
        data: {
          ...createPostInput,
        },
      });

      console.log(post);

      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }
}
