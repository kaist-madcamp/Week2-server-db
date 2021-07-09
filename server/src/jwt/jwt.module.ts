import { Module, DynamicModule } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interface';
import { JwtService } from './jwt.service';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({})
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
        UsersService,
        PrismaService,
      ],
      exports: [JwtService],
    };
  }
}
