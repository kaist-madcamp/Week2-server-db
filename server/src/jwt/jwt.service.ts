import { Injectable, Inject } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interface';
import { CONFIG_OPTIONS } from '../common/common.constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly jwtOptions: JwtModuleOptions,
  ) {}

  sign(id: number) {
    return jwt.sign({ id }, this.jwtOptions.jwt_key);
  }

  verfiy(token: string) {
    try {
      return jwt.verify(token, this.jwtOptions.jwt_key);
    } catch (error) {
      return;
    }
  }
}
