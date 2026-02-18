import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecadoDTO {
  @IsString()
  @IsNotEmpty()
  readonly texto: string;

  @IsString()
  @IsNotEmpty()
  readonly de: string;

  @IsString()
  @IsNotEmpty()
  readonly para: string;
}
