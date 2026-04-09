import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  amountCents!: number;

  @IsString()
  reference!: string;

  @IsIn(['pix', 'stripe'])
  provider!: 'pix' | 'stripe';

  @IsOptional()
  @IsIn(['BRL'])
  currency? = 'BRL' as const;
}
