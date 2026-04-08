import { PaymentGateway } from './payments.types';
// agrupa as credenciais específicas do Stripe, evitando receber campos desnecessários de outros tipos
type StripeCredentials = {
  clientId: string;
  clientSecret: string;
  sandbox?: boolean;
};

export class StripeGateway implements PaymentGateway {
  constructor(private readonly creds: StripeCredentials) {}

  async charge(input: { amountCents: number; currency: 'BRL'; reference: string }) {
    await Promise.resolve(); //Diz para esperar a requisição ser resolvida
    return { id: `stripe_${input.reference}`, status: 'pending' as const };
  }
}
