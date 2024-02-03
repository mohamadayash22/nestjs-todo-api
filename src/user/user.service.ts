import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
        name: dto.name,
      },
    });

    delete user.hash;
    return user;
  }

  async findById(userId: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
