import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from './dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/user/dto';
import { Token } from './types/token';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async singup(dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  async signin(dto: SigninDto): Promise<Token> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<Token> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return { accessToken: token };
  }
}
