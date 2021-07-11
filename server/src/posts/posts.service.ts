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
import { ToggleLikeOutput } from './dtos/toggle-like-post.dto';
import { SearchPostsByQueryOutput } from './dtos/search-posts-by-query.dto';

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
          contents: true,
          authorId: true,
          likes: true,
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
          id: createPostInput.categoryId,
        },
        select: {
          id: true,
        },
      });
      if (!category) {
        return {
          ok: false,
          error: '존재하지 않는 카테고리입니다. 카테고리를 생성해주세요!',
        };
      }
      await this.prismaService.post.create({
        data: {
          title: createPostInput.title,
          contents: createPostInput.contents,
          categoryId: category.id,
          authorId: authUser.id,
        },
      });

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
      console.log(post);
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

  public async toggleLikePost(
    authUser: User,
    postId: string,
  ): Promise<ToggleLikeOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: +postId,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }

      const like = await this.prismaService.like.findUnique({
        where: {
          userId_postId: {
            userId: authUser.id,
            postId: +postId,
          },
        },
      });
      if (like) {
        await this.prismaService.like.delete({
          where: {
            id: like.id,
          },
        });
        return {
          ok: true,
        };
      } else {
        await this.prismaService.like.create({
          data: {
            userId: authUser.id,
            postId: +postId,
          },
        });
        return {
          ok: true,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }
}

@Injectable()
export class SearchService {
  constructor(private readonly prismaService: PrismaService) {}

  public async searchPostsByQuery(
    query: string,
  ): Promise<SearchPostsByQueryOutput> {
    try {
      const posts = await this.prismaService.post.findMany({
        where: {
          title: {
            startsWith: query,
          },
        },
        select: {
          id: true,
          title: true,
        },
        take: 10,
      });
      return {
        ok: true,
        posts,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
