import { IsNumber } from 'class-validator';

export class UpdatePaymentAmount {
  @IsNumber()
  amountCents!: number;
}
