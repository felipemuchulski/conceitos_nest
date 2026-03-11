import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    console.log('SimpleCacheInterceptor executado ANTES');
    const request = context.switchToHttp().getRequest<{ url: string }>();
    const url: string = request.url;

    if (this.cache.has(url)) {
      console.log('Esta no cache', url);
      return of(this.cache.get(url));
    }

    return next.handle().pipe(
      tap((data) => {
        this.cache.set(url, data);
        console.log('Armazenando em cache', url);
      }),
    );
  }
}
