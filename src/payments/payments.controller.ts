import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Post('charge')
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createCharge(createPaymentDto);
  }
}
