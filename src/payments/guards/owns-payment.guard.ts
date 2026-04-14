import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { PaymentService } from '../payment.service';
import { Request } from 'express';

@Injectable()
export class OwnsPaymentGuard implements CanActivate {
  constructor(private paymentService: PaymentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.user?.id;
    const reference = request.params.reference as string;

    const payment = await this.paymentService.findByReference(reference);

    if (payment.id !== userId) {
      throw new ForbiddenException('Este pagamento não pertence a você');
    }

    return true;
  }
}
