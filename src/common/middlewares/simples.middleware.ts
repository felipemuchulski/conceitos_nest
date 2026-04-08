// Cliente (navegador) -> (Servidor) Middleware (Request, Response) ->
// Express -> Servidor que está recebendo a requisição
// -> NestJs (Guards, Interceptors, Pipes, Filters)

import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// Middleware ele tem acesso bruto ao request e response.
export class SimplesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimppleMiddleware: Olá');

    //Terminando a cadeia de chamadas
    return res.status(404).send({
      message: 'Não encontrado',
    });
  }
}
