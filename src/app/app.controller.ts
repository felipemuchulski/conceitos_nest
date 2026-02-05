import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home') // home
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Método da solicitação -> Ler (Read) Create,Read,Update, Delete
  @Get('hello') // /home/hello
  getHello(): string {
    return 'Qualquer coisa';
  }
}
