import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import morgan from 'morgan';
import bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    console.log('headers : ', req.headers);
    console.log('body : ', req.body);
    next();
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(80);
}
bootstrap();
 