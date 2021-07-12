import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { DeletePostOutput } from './dtos/delete-post.dto';
import { EditPostInput, EditPostOutput } from './dtos/edit-post.dto';
import { FindPostByIdOutput } from './dtos/find-post-by-id.dto';
import { FindPostsByCategoryOutput } from './dtos/find-posts-by-category.dto';
import { ToggleLikeOutput } from './dtos/toggle-like-post.dto';
import { SearchPostsByQueryOutput } from './dtos/search-posts-by-query.dto';
import { computeLikesNumber } from './posts.utils';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dtos/create-comment.dto';
import {
  DeleteCommentInput,
  DeleteCommentOutput,
} from './dtos/delete-comment.dto';
import { FindCommentsByPostIdOutput } from './dtos/find-comments-by-postId.dto';
import { EditCommentInput, EditCommentOutput } from './dtos/edit-comment.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findPostById(postId: string): Promise<FindPostByIdOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: +postId,
        },
        select: {
          id: true,
          title: true,
          contents: true,
          authorId: true,
          likes: {
            select: {
              id: true,
            },
          },
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
    categoryId: string,
  ): Promise<FindPostsByCategoryOutput> {
    try {
      const posts = await this.prismaService.post.findMany({
        where: {
          categoryId: +categoryId,
        },
        select: {
          id: true,
          title: true,
          contents: true,
          authorId: true,
          likes: {
            select: {
              id: true,
            },
          },
        },
      });

      return {
        ok: true,
        posts: computeLikesNumber(posts),
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
      const post = await this.prismaService.post.create({
        data: {
          title: createPostInput.title,
          contents: createPostInput.contents,
          categoryId: category.id,
          authorId: authUser.id,
        },
      });

      console.log('Created post : ', post);
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
    postId: string,
  ): Promise<DeletePostOutput> {
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
      if (post.authorId !== owner.id) {
        return {
          ok: false,
          error: '권한이 없습니다.',
        };
      }
      await this.prismaService.post.delete({
        where: {
          id: +postId,
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
        include: {
          likes: true,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }

      console.log(post);

      const like = await this.prismaService.like.findUnique({
        where: {
          userId_postId: {
            userId: authUser.id,
            postId: +postId,
          },
        },
      });

      const likesNumber = post.likes.length;

      if (like) {
        await this.prismaService.like.delete({
          where: {
            id: like.id,
          },
        });
        return {
          ok: true,
          likes: likesNumber - 1,
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
          likes: likesNumber + 1,
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

  public async createComment(
    authUser: User,
    { postId, payload }: CreateCommentInput,
  ): Promise<CreateCommentOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시물입니다.',
        };
      }

      await this.prismaService.comment.create({
        data: {
          userId: authUser.id,
          postId,
          payload,
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

  public async deleteComment(
    authUser: User,
    { commentId }: DeleteCommentInput,
  ): Promise<DeleteCommentOutput> {
    try {
      const comment = await this.prismaService.comment.findUnique({
        where: {
          id: commentId,
        },
      });
      if (!comment) {
        return {
          ok: false,
          error: '존재하지 않는 댓글입니다.',
        };
      }
      if (comment.userId !== authUser.id) {
        return {
          ok: false,
          error: '본인의 댓글만 삭제할 수 있습니다.',
        };
      }
      await this.prismaService.comment.delete({
        where: {
          id: commentId,
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

  public async editComment(
    authUser: User,
    { postId, payload }: EditCommentInput,
  ): Promise<EditCommentOutput> {
    try {
      const comment = await this.prismaService.comment.findUnique({
        where: {
          id: postId,
        },
      });

      if (!comment) {
        return {
          ok: false,
          error: '존재하지 않는 댓글입니다.',
        };
      }

      if (comment.userId !== authUser.id) {
        return {
          ok: false,
          error: '본인의 댓글이 아닙니다.',
        };
      }

      await this.prismaService.comment.update({
        where: {
          id: postId,
        },
        data: {
          payload,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return;
    }
  }

  public async findCommentsByPostId(
    postId: string,
  ): Promise<FindCommentsByPostIdOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: +postId,
        },
        include: {
          comments: true,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시물입니다.',
        };
      }
      console.log(post.comments);
      return {
        ok: true,
        comments: post.comments,
      };
    } catch (error) {
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
          contents: true,
          authorId: true,
          likes: true,
        },
        take: 10,
      });

      console.log(posts);
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
