import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    console.log('ErrorHandlingInterceptor executado');

    return next.handle().pipe(
      catchError((error: Error) => {
        console.log(error.name);
        console.log(error.message);
        return throwError(() => {
          if (error.name === 'NotFoundException') {
            return new BadRequestException(error.message);
          }
          return error; // Retorna o erro original se não for NotFoundException
        });
      }),
    );
  }
}
