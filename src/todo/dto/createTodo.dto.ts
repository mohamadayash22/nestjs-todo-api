import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  description: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
