import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePessoaDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  passwordHash: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nome: string;
}
