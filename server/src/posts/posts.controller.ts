import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
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
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:id')
  async findPostById(
    @Param() params: FindPostByIdInput,
  ): Promise<FindPostByIdOutput> {
    return this.postsService.findPostById(params);
  }

  @Get('/all/:categoryId')
  async findPostsByCategory(
    @Param() params: FindPostsByCategoryInput,
  ): Promise<FindPostsByCategoryOutput> {
    return this.postsService.findPostsByCategory(params);
  }

  @Post('')
  @UseGuards(AuthGuard)
  async createPost(
    @AuthUser() authUser: User,
    @Body() createPostInput: CreatePostInput,
  ): Promise<CreatePostOutput> {
    return this.postsService.createPost(authUser, createPostInput);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePost(
    @AuthUser() owner: User,
    @Param() params: DeletePostInput,
  ): Promise<DeletePostOutput> {
    return this.postsService.deletePost(owner, params);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async editPost(
    @AuthUser() owner: User,
    @Param('id') id: string,
    @Body() editPost: EditPostInput,
  ): Promise<EditPostOutput> {
    return this.postsService.editPost(owner, id, editPost);
  }
}
