import { Body, Controller, HttpCode, HttpStatus, Get, Param, Post, Patch, Delete, Query } from '@nestjs/common';
import { CreateRecadoDTO } from './dtos/create-recado.dto';
import { AtulizaRecadosDTO } from './dtos/atualizar-recado.dto';

// CRUD
// Create -> Post -> Criar um novo recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um arquivo
// Update -> PATCH/PUT -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATCH é utilizado para attualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: AtulizaRecadosDTO) {
    return {
      id,
      ...body, // aqui eu "espalhei" tudo que veio no body e por isso o "atualizar" passou
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Essa rota remove o recado de id ${id}`;
  }

  @Get()
  withQueryParams(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    console.log(pagination);
    return `Retorna todos os recaods. Limit =${limit} e offset=${offset}`;
  }
}
