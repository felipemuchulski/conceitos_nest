import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now = Date.now();
    console.log('TimingConnectionInterceptor executado');

    return next.handle().pipe(
      tap(() => {
        const end = Date.now() - now;
        console.log(`Executado depois de executar o método, tempo ${end} executando`);
      }),
    );
  }
}
