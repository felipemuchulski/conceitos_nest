import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PIX_GATEWAY, STRIPE_GATEWAY } from './payments.constants';
import type { PaymentGateway } from './payments.types';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePaymentAmount } from './dto/update-payment-amount.dto';

@Injectable()
export class PaymentService {
  // @Inject busca no container do NestJS o que estiver registrado com cada token (PIX_GATEWAY e STRIPE_GATEWAY)
  // @InjectRepository injeta o repositório de Payment criado automaticamente pelo TypeORM
  constructor(
    @Inject(PIX_GATEWAY) private pixGateway: PaymentGateway,
    @Inject(STRIPE_GATEWAY) private stripeGateway: PaymentGateway,
    @InjectRepository(Payment)
    private readonly repositoryPayment: Repository<Payment>,
  ) {}

  // cria a cobrança usando o gateway escolhido pelo cliente (pix ou stripe)
  async createCharge(createChargeDto: CreatePaymentDto, userId: number) {
    const { reference, amountCents, provider } = createChargeDto;
    const paymentExist = this.repositoryPayment.findOneBy({
      reference: createChargeDto.reference,
    });

    if (await paymentExist) {
      throw new ConflictException(`Já existe um pagamento com essa referência ${reference}`);
    }

    const gateway = provider === 'pix' ? this.pixGateway : this.stripeGateway;
    const result = await gateway.charge({ reference, amountCents, currency: 'BRL' });

    //salvar o pagamento no banco
    const payment = this.repositoryPayment.create({
      reference,
      amountCents,
      provider,
      userId,
      externalId: result.id,
      status: result.status,
    });

    return this.repositoryPayment.save(payment);
  }

  //encontrar todas as cobranças por usuário
  async findAllByUser(userId: number) {
    const payments = await this.repositoryPayment.findBy({ userId });
    return payments;
  }

  // encontra todos as cobranças quando o usuário é admin
  async findAll() {
    const payments = await this.repositoryPayment.find();
    return payments;
  }

  //encontra uma cobrança por ID para o admin
  async findOneBy(id: number) {
    const payment_id = await this.repositoryPayment.findOneBy({
      id: id,
    });

    if (!payment_id) {
      throw new NotFoundException(`O id ${id} não foi encontrado`);
    }

    return payment_id;
  }

  //encontra uma cobrança por reference para rastreamento de negócio
  async findByReference(reference: string) {
    const payment_reference = await this.repositoryPayment.findOneBy({
      reference: reference,
    });

    if (!payment_reference) {
      throw new NotFoundException(`Pagamento com referência ${reference} não encontrado`);
    }

    return payment_reference;
  }

  //atualiza o valor da cobrança com reference
  async updatePaymentReference(reference: string, updatePaymentAmount: UpdatePaymentAmount) {
    const payment = await this.repositoryPayment.findOneBy({ reference: reference }); //encontra o pagamento pela referencia

    if (!payment) {
      throw new NotFoundException(`Pagamento com referência ${reference} não encontrado`);
    }

    if (payment.status !== 'pending') {
      throw new ConflictException('Não é possível atualizar o valor de um pagamento que não é pendente');
    }

    payment.amountCents = updatePaymentAmount.amountCents; // atribui o novo valor
    return this.repositoryPayment.save(payment); // salva o novo valor
  }
}
