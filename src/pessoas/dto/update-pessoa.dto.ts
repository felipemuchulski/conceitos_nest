import { PartialType } from '@nestjs/mapped-types';
import { CreatePessoaDto } from './create-pessoa.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
