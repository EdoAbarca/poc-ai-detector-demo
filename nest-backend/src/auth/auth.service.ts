import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto, SignInDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }

  async signup(dto: SignUpDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    const currentTime = new Date();
    const formattedDate = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()}`;
    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: hash,
          created: formattedDate,
          //createdTime: currentTime,
        },
      });

      //return this.signToken(user.id, user.email);
      return { "user": user }
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credenciales ya están en uso',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: SignInDto) {
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Usuario no encontrado',
      );
    console.log(user.password, dto.password);
    // compare password
    const pwMatches = await argon.verify(
      user.password,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Contraseña incorrecta',
      );
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ):
    Promise<{ user: any, access_token: string, refresh_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const accessToken = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '5m',
        secret: secret,
      },
    );

    const refreshToken = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '8h',
        secret: secret,
      },
    );
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const userReturn = {
      id: user.id,
      username: user.username,
      email: user.email,
    }
    return {
      user: userReturn,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string, refresh_token: string }> {
    try {
      const payload = await this.jwt.verifyAsync(refreshToken, { secret: this.config.get('JWT_SECRET') });
      console.log(payload);
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });

      if (!user) {
        throw new ForbiddenException('User not found');
      }

      const newAccessToken = await this.jwt.signAsync(
        { sub: user.id, email: user.email },
        {
          expiresIn: '5m',
          secret: this.config.get('JWT_SECRET'),
        },
      );

      const newRefreshToken = await this.jwt.signAsync(
        { sub: user.id, email: user.email },
        {
          expiresIn: '8h',
          secret: this.config.get('JWT_SECRET'),
        },
      );

      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token');
    }
  }
}