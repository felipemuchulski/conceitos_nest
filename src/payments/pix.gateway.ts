import { PaymentGateway } from './payments.types'; // importa o tipo
// agrupa as credenciais específicas do Pix, evitando receber campos desnecessários de outros tipos
type PixCredentials = {
  clientId: string; //Esto dizendo que é necessário o id
  clientSecret: string; //Estou dizendo que é necessária a secret
  sandbox?: boolean; //Estou dizendo que o sandbox é opicional
};

export class PixGateway implements PaymentGateway {
  // implements garante que a classe segue o contrato da interface PaymentGateway
  constructor(private readonly creds: PixCredentials) {}

  //O método charge é "cobrança" que estou fazendo ao cliente
  async charge(input: { amountCents: number; currency: 'BRL'; reference: string }) {
    // chamada ao provider Pix aqui
    await Promise.resolve(); // simulando operação async
    return { id: `pix_${input.reference}`, status: 'pending' as const };

    //O 'as const' é uma asserção de tipo que diz ao TS "não altere esse tipo", trate como o valor exato
    //que está escrito.
  }
}
