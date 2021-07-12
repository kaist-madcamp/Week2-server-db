import { ToggleLikeOutput } from './dtos/toggle-like-post.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { DeletePostOutput } from './dtos/delete-post.dto';
import { EditPostInput, EditPostOutput } from './dtos/edit-post.dto';
import { FindPostByIdOutput } from './dtos/find-post-by-id.dto';
import { FindPostsByCategoryOutput } from './dtos/find-posts-by-category.dto';
import { PostsService, SearchService } from './posts.service';
import { SearchPostsByQueryOutput } from './dtos/search-posts-by-query.dto';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dtos/create-comment.dto';
import {
  DeleteCommentInput,
  DeleteCommentOutput,
} from './dtos/delete-comment.dto';
import { FindCommentsByPostIdOutput } from './dtos/find-comments-by-postId.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:postId')
  async findPostById(
    @Param('postId') postId: string,
  ): Promise<FindPostByIdOutput> {
    return this.postsService.findPostById(postId);
  }

  @Get('/all/:categoryId')
  async findPostsByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<FindPostsByCategoryOutput> {
    return this.postsService.findPostsByCategory(categoryId);
  }

  @Post('')
  @UseGuards(AuthGuard)
  async createPost(
    @AuthUser() authUser: User,
    @Body() createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    return this.postsService.createPost(authUser, createPostInput);
  }

  @Delete('/:postId')
  @UseGuards(AuthGuard)
  async deletePost(
    @AuthUser() owner: User,
    @Param('postId') postId: string,
  ): Promise<DeletePostOutput> {
    return this.postsService.deletePost(owner, postId);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async editPost(
    @AuthUser() owner: User,
    @Param('id') id: string,
    @Body() editPost: EditPostInput,
  ): Promise<EditPostOutput> {
    return this.postsService.editPost(owner, id, editPost);
  }

  @Post('/toggleLike')
  @UseGuards(AuthGuard)
  async toggleLikePost(
    @AuthUser() authUser: User,
    @Body('postId') postId: string,
  ): Promise<ToggleLikeOutput> {
    return this.postsService.toggleLikePost(authUser, postId);
  }

  @Post('/comment')
  @UseGuards(AuthGuard)
  async createComment(
    @AuthUser() authUser: User,
    @Body() createCommentInput: CreateCommentInput,
  ): Promise<CreateCommentOutput> {
    return this.postsService.createComment(authUser, createCommentInput);
  }

  @Delete('/comment')
  @UseGuards(AuthGuard)
  async deleteComment(
    @AuthUser() authUser: User,
    @Body() deleteCommentInput: DeleteCommentInput,
  ): Promise<DeleteCommentOutput> {
    return this.postsService.deleteComment(authUser, deleteCommentInput);
  }

  @Get('/comments/:postId')
  async findCommentsByPostId(
    @Param('postId') postId: string,
  ): Promise<FindCommentsByPostIdOutput> {
    return this.postsService.findCommentsByPostId(postId);
  }
}

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/')
  async searchPostsByQuery(
    @Query('query') query: string,
  ): Promise<SearchPostsByQueryOutput> {
    return this.searchService.searchPostsByQuery(query);
  }
}
