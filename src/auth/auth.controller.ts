import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto';
import { Token } from './types/token';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto): Promise<User> {
    return this.authService.singup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: SigninDto): Promise<Token> {
    return this.authService.signin(dto);
  }
}
