import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePessoaDto {
  @IsEmail()
  email!: string; // vai ser o usuário

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password!: string; // senha vai passar por um hash
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nome!: string;
}
