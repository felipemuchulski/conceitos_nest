import { Inject, Injectable } from '@nestjs/common';
import { PIX_GATEWAY, STRIPE_GATEWAY } from './payments.constants';
import type { PaymentGateway } from './payments.types';

@Injectable()
export class PaymentService {
  // @Inject busca no container do NestJS o que estiver registrado com cada token (PIX_GATEWAY e STRIPE_GATEWAY)
  constructor(
    @Inject(PIX_GATEWAY) private pixGateway: PaymentGateway,
    @Inject(STRIPE_GATEWAY) private stripeGateway: PaymentGateway,
  ) {}

  // cria a cobrança usando o gateway escolhido pelo cliente (pix ou stripe)
  createCharge(reference: string, amountCents: number, provider: 'pix' | 'stripe') {
    const gateway = provider === 'pix' ? this.pixGateway : this.stripeGateway;
    return gateway.charge({ reference, amountCents, currency: 'BRL' });
  }
}
