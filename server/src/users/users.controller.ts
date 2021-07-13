import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { JoinInput, JoinOutput } from './dto/join.dto';
import { KakaoAuthInput, KakaoAuthOutput } from './dto/kakao-auth.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/join')
  async join(@Body() joinInput: JoinInput): Promise<JoinOutput> {
    return this.usersService.join(joinInput);
  }

  @Post('/login')
  async login(@Body() loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Post('/kakao')
  async socialAuth(
    @Body() kakaoAuthInput: KakaoAuthInput,
  ): Promise<KakaoAuthOutput> {
    return this.usersService.socialAuth(kakaoAuthInput);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@AuthUser() user: User) {
    return this.usersService.me(user.id);
  }
}
