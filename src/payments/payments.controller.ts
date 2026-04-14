import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { IsAuthenticatedGuard } from '@/common/guards/is-authenticated.guard';
import { OwnsPaymentGuard } from './guards/owns-payment.guard';

@Controller('payments')
@UseGuards(IsAuthenticatedGuard, OwnsPaymentGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Post('charge')
  create(@Body() createPaymentDto: CreatePaymentDto, userId: number) {
    return this.paymentsService.createCharge(createPaymentDto, userId);
  }

  // Necessário criar os outros métodos
}
