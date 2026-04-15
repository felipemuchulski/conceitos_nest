import { Body, Param, Controller, Get, Post, UseGuards, UseInterceptors, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { IsAuthenticatedGuard } from '@/common/guards/is-authenticated.guard';
import { OwnsPaymentGuard } from './guards/owns-payment.guard';
import { TransformPaymentResponseInterceptor } from './interceptors/transform-payment-response.interceptor';
import type { Request as ExpressRequest } from 'express';

@Controller('payments')
@UseGuards(IsAuthenticatedGuard, OwnsPaymentGuard)
@UseInterceptors(TransformPaymentResponseInterceptor)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @Req() req: ExpressRequest) {
    return this.paymentsService.createCharge(createPaymentDto, req.user!.id);
  }

  // Necessário criar os outros métodos
  @Get(':reference')
  @UseInterceptors(TransformPaymentResponseInterceptor)
  findbyReference(@Param('reference') reference: string) {
    return this.paymentsService.findByReference(reference);
  }
}
