import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '../jwt/jwt.module';
import { JwtMiddleware } from '../jwt/jwt.middleware';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import * as Joi from 'joi';
import { PostsModule } from 'src/posts/posts.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_KEY: Joi.string().required(),
      }),
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    JwtModule.forRoot({
      jwt_key: process.env.JWT_KEY,
    }),
    UsersModule,
    PostsModule,
    CategoriesModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
