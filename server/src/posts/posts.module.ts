import { Module } from '@nestjs/common';
import { PostsService, SearchService } from './posts.service';
import { PostsController, SearchController } from './posts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (_, __, cb) => {
          cb(null, 'uploads/');
        },
        filename: (_, file, cb) => {
          cb(null, new Date().valueOf() + path.extname(file.originalname));
        },
      }),
    }),
  ],
  providers: [PostsService, SearchService, PrismaService],
  controllers: [PostsController, SearchController],
})
export class PostsModule {}
