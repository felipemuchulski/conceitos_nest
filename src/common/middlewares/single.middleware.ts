// Cliente (Navegador) ->(Servidor)->  Middleware (Request, Response) ->

import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// NestJS (guard, interceptors, pipes, filters)
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Middleware executado');
    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        id: 1,
        nome: 'Felipe',
        sobrenome: 'Muchulski',
        role: 'admin',
      };
    }
    next();
  }
}
