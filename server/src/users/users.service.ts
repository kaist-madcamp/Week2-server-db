import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { JoinInput, JoinOutput } from './dto/join.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { checkPassword, hashPassword } from './users.utils';
import { KakaoAuthInput, KakaoAuthOutput } from './dto/kakao-auth.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async join(joinInput: JoinInput): Promise<JoinOutput> {
    try {
      const exists = await this.prismaService.user.findUnique({
        where: {
          email: joinInput.email,
        },
      });
      if (exists) {
        return {
          ok: false,
          error: '이미 존재하는 계정입니다.',
        };
      }

      const hashedPassword = await hashPassword(joinInput.password);

      const user = await this.prismaService.user.create({
        data: {
          ...joinInput,
          password: hashedPassword,
        },
      });
      console.log(user);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: '존재하지 않는 계정입니다.',
        };
      }

      const passwordCorrecet = await checkPassword(password, user.password);
      if (!passwordCorrecet) {
        return {
          ok: false,
          error: '비밀번호가 일치하지 않습니다.',
        };
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: '로그인에 실패하였습니다.',
      };
    }
  }

  async socialAuth(kakaoAuthInput: KakaoAuthInput): Promise<KakaoAuthOutput> {
    try {
      const { kakaoId, email, username } = kakaoAuthInput;
      console.log('here!!');
      const exist = await this.prismaService.user.findFirst({
        where: {
          OR: [
            {
              id: +kakaoId,
            },
            {
              email,
            },
          ],
        },
      });

      if (exist) {
        // 로그인. 토큰 보내주기
        console.log('exists');
        const token = jwt.sign({ id: kakaoId }, process.env.JWT_KEY);
        return {
          ok: true,
          token,
        };
      } else {
        // 회원가입. 유저 생성하기
        const user = await this.prismaService.user.create({
          data: {
            id: +kakaoId,
            email,
            username,
          },
        });
        return {
          ok: true,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }

  async findUserById(id: number): Promise<Partial<User>> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
  }
}
