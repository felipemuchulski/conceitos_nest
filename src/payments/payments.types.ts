export type PaymentProvider = 'pix' | 'stripe';
//Aqui eu estou dizendo que o provider pode ter um desses valores

export interface PaymentsModuleOptions {
  provider: PaymentProvider;
  apiKey?: string; //ex: Stripe
  pixClientId?: string; //ex: Pix provider
  pixClientSecret?: string;
  sandbox?: boolean; // se true, usa ambiente de testes do provider (sem movimentar dinheiro real)
}

export interface PaymentGateway {
  charge(input: {
    amountCents: number; //Valor da cobrança em centavos
    currency: 'BRL'; //tipo da moeda
    reference: string; //identtificador único criado para rastrear a cobrança
  }): Promise<{ id: string; status: 'pending' | 'paid' | 'failed' }>;
}
/*
 amountCents é utilizado centavos para evitar problemas com ponto flutuante.
 É uma prática padrão em sistemas de pagamento - praticamente todas as APIs
 de gateway (Stripe, PagSeguro, etc) trabalham com centavos por esse motivo.
*/

/*
 O gateway é uma tecnologia que atua como uma ponte entre o comprador, o vendedor e 
 as instituições financeiras durante uma transação online.
 Ele captura e transmite os dados do pagamento de forma segura, garantindo que as informações
 sejam processadas rapidamente e sem interrupções.
*/
