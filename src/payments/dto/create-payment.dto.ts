import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amountCents!: number;

  @IsString()
  reference!: string; // id gerado com o gateway pagamento

  @IsIn(['pix', 'stripe'])
  provider!: 'pix' | 'stripe';

  @IsOptional()
  @IsIn(['BRL'])
  currency? = 'BRL' as const;
}
