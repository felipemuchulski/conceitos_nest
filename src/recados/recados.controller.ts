import { Body, Controller, HttpCode, HttpStatus, Get, Param, Post } from '@nestjs/common';
import { CreateRecadoDTO } from './dtos/create-recado.dto';
@Controller('recados')
export class RecadosController {
  @Get('all_recados')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return 'Essa retorna um recado';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return 'Essa rota retorna um parametro';
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() recado: CreateRecadoDTO) {
    console.log(recado);
    return recado;
  }
}
