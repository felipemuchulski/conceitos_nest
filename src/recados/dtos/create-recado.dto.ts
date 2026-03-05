import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecadoDTO {
  @IsString()
  @IsNotEmpty()
  readonly texto: string;

  @IsNumber()
  @IsNotEmpty()
  readonly de: number;

  @IsNumber()
  @IsNotEmpty()
  readonly para: number;
}
