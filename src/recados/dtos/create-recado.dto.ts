import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateRecadoDTO {
  @IsString()
  @IsNotEmpty()
  readonly texto: string;

  @IsPositive()
  deId: number;

  @IsPositive()
  paraId: number;
}
