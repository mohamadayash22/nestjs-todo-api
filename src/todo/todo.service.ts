import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { PrismaService } from 'nestjs-prisma';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodos(userId: number): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      where: {
        userId,
      },
    });
  }

  async findById(userId: number, todoId: number): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({
      where: {
        userId,
        id: todoId,
      },
    });

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async createTodo(userId: number, dto: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async updateTodo(
    userId: number,
    todoId: number,
    dto: UpdateTodoDto,
  ): Promise<Todo> {
    await this.findById(userId, todoId);
    return this.prisma.todo.update({
      where: {
        userId,
        id: todoId,
      },
      data: dto,
    });
  }

  async deleteTodo(userId: number, todoId: number): Promise<Todo> {
    await this.findById(userId, todoId);
    return this.prisma.todo.delete({
      where: {
        userId,
        id: todoId,
      },
    });
  }
}
