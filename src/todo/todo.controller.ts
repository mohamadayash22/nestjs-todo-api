import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/user/decorator';
import { Todo } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getTodos(@GetUser('id') userId: number): Promise<Todo[]> {
    return this.todoService.getTodos(userId);
  }

  @Get(':id')
  async getTodoById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
  ): Promise<Todo> {
    return this.todoService.findById(userId, todoId);
  }

  @Post()
  async createTodo(
    @GetUser('id') userId: number,
    @Body() dto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.createTodo(userId, dto);
  }

  @Put(':id')
  async updateTodo(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
    @Body() dto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(userId, todoId, dto);
  }

  @Delete(':id')
  async deleteTodo(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) todoId: number,
  ): Promise<Todo> {
    return this.todoService.deleteTodo(userId, todoId);
  }
}
