// Cliente (Navegador) ->(Servidor)->  Middleware (Request, Response) ->

import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// NestJS (guard, interceptors, pipes, filters)
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Middleware executado');
    next();
  }
}
