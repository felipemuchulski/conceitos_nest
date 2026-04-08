import { PIX_GATEWAY, STRIPE_GATEWAY, PAYMENT_MODULE_OPTIONS } from './payments.constants';
import type { PaymentsModuleOptions } from './payments.types';
import { PaymentService } from './payment.service';
import { PixGateway } from './pix.gateway';
import { StripeGateway } from './stripe.gateway';
import { DynamicModule, Module, Provider } from '@nestjs/common';

@Module({})
export class PaymentsModule {
  // static permite chamar forRoot direto na classe sem precisar instanciá-la
  static forRoot(options: PaymentsModuleOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: PAYMENT_MODULE_OPTIONS,
      useValue: options,
    };

    const pixGatewayProvider: Provider = {
      provide: PIX_GATEWAY,
      useFactory: () => {
        // se for pix, instancia o PixGateway com as credenciais necessárias
        return new PixGateway({
          clientId: options.pixClientId!,
          clientSecret: options.pixClientSecret!,
          sandbox: options.sandbox,
        });
      },
    };

    // registra o gateway Stripe
    const stripeGatewayProvider: Provider = {
      provide: STRIPE_GATEWAY,
      useFactory: () => {
        return new StripeGateway({
          apiKey: options.apiKey!,
          sandbox: options.sandbox,
        });
      },
    };

    return {
      module: PaymentsModule,
      providers: [optionsProvider, pixGatewayProvider, stripeGatewayProvider, PaymentService],
      exports: [PaymentService],
    };
  }
}
