import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformPaymentResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown) => {
        // Se for array, transforma cada item
        if (Array.isArray(data)) {
          return {
            success: true,
            timestamp: new Date().toISOString(),
            data: data.map((item: Record<string, unknown>) => ({
              ...item,
              amountBRL: typeof item.amountCents === 'number' ? (item.amountCents / 100).toFixed(2) : undefined,
            })),
          };
        }

        // Se for objeto único
        const payment = data as Record<string, unknown>;
        return {
          success: true,
          timestamp: new Date().toISOString(),
          data: {
            ...payment,
            amountBRL: typeof payment.amountCents === 'number' ? (payment.amountCents / 100).toFixed(2) : undefined,
          },
        };
      }),
    );
  }
}
