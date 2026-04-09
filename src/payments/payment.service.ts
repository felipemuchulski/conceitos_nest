import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PIX_GATEWAY, STRIPE_GATEWAY } from './payments.constants';
import type { PaymentGateway } from './payments.types';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  private processedReferences = new Set<string>();
  // @Inject busca no container do NestJS o que estiver registrado com cada token (PIX_GATEWAY e STRIPE_GATEWAY)
  constructor(
    @Inject(PIX_GATEWAY) private pixGateway: PaymentGateway,
    @Inject(STRIPE_GATEWAY) private stripeGateway: PaymentGateway,
  ) {}

  // cria a cobrança usando o gateway escolhido pelo cliente (pix ou stripe)
  createCharge(createChargeDto: CreatePaymentDto) {
    const { reference, amountCents, provider } = createChargeDto;

    if (this.processedReferences.has(reference)) {
      throw new ConflictException(`Cobrança com referência ${reference} já existe`);
    }

    this.processedReferences.add(reference);
    const gateway = provider === 'pix' ? this.pixGateway : this.stripeGateway;
    return gateway.charge({ reference, amountCents, currency: 'BRL' });
  }

  //encontrar todas as cobranças
  findAll() {
    return Array.from(this.processedReferences); //vai retornar um array para não precisar simular em banco
  }
}
