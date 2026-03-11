import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const now = Date.now();
    console.log('TimingConnectionInterceptor executado');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return next.handle().pipe(
      tap(() => {
        const end = Date.now() - now;
        console.log(`Executado depois de executar o método, tempo ${end} executando`);
      }),
    );
  }
}
