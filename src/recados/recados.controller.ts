import { Controller, Get } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  @Get('all_recados')
  findAll() {
    return 'Essa retorna um recado';
  }

  @Get(':id')
  findOne() {
    return 'Essa rota retorna um parametro';
  }
}
