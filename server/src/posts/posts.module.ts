import { Module } from '@nestjs/common';
import { PostsService, SearchService } from './posts.service';
import { PostsController, SearchController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PostsService, SearchService, PrismaService],
  controllers: [PostsController, SearchController],
})
export class PostsModule {}
