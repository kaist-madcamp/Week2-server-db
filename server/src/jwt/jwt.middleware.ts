import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '@prisma/client';
import { NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('body : ', req.body);
    console.log('has token : ', req.headers['token'] ? 'true' : 'false');

    if ('token' in req.headers) {
      const decoded = this.jwtService.verfiy(req.headers['token']);
      if (typeof decoded === 'object' && 'id' in decoded) {
        const user = await this.usersService.findUserById(decoded.id);
        req.headers['user'] = user;
      }
    }
    next();
  }
}
