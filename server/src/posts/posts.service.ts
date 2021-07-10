import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/delete-post.dto';
import { EditPostInput, EditPostOutput } from './dtos/edit-post.dto';
import {
  FindPostByIdInput,
  FindPostByIdOutput,
} from './dtos/find-post-by-id.dto';
import {
  FindPostsByCategoryInput,
  FindPostsByCategoryOutput,
} from './dtos/find-posts-by-category.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findPostById(
    params: FindPostByIdInput,
  ): Promise<FindPostByIdOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: +params.id,
        },
      });
      console.log(post);
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      return {
        ok: true,
        post,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }

  public async findPostsByCategory(
    params: FindPostsByCategoryInput,
  ): Promise<FindPostsByCategoryOutput> {
    try {
      const posts = await this.prismaService.post.findMany({
        where: {
          categoryId: +params.categoryId,
        },
        select: {
          id: true,
          title: true,
          subtitle: true,
          authorId: true,
        },
      });

      console.log(posts);
      return {
        ok: true,
        posts: posts,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  public async createPost(
    authUser: User,
    createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    try {
      const category = await this.prismaService.category.findUnique({
        where: {
          name: createPostInput.categoryName,
        },
      });
      if (!category) {
        return {
          ok: false,
          error: '존재하지 않는 카테고리입니다. 카테고리를 생성해주세요!',
        };
      }
      const post = await this.prismaService.post.create({
        data: {
          title: createPostInput.title,
          subtitle: createPostInput.subtitle,
          categoryId: category.id,
          authorId: authUser.id,
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

  public async deletePost(
    owner: User,
    { id }: DeletePostInput,
  ): Promise<DeletePostOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: +id,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      if (post.authorId !== owner.id) {
        return {
          ok: false,
          error: '권한이 없습니다.',
        };
      }
      await this.prismaService.post.delete({
        where: {
          id: +id,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  public async editPost(
    owner: User,
    id: string,
    editPostInput: EditPostInput,
  ): Promise<EditPostOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: +id,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시물입니다.',
        };
      }

      if (post.authorId !== owner.id) {
        return {
          ok: false,
          error: '권한이 없습니다.',
        };
      }

      await this.prismaService.post.update({
        where: {
          id: +id,
        },
        data: {
          ...editPostInput,
        },
      });

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
