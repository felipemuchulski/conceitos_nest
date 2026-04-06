import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;
}
