import { Body, Controller, HttpCode, HttpStatus, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { CreateRecadoDTO } from './dtos/create-recado.dto';
import { AtulizaRecadosDTO } from './dtos/atualizar-recado.dto';
import { RecadosService } from './recados.service';

// CRUD
// Create -> Post -> Criar um novo recado
// Read -> GET -> Ler todos os recados
// Read -> GET -> Ler apenas um arquivo
// Update -> PATCH/PUT -> Atualizar um recado
// Delete -> DELETE -> Apagar um recado

// PATCH é utilizado para attualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

// DTO - Data Transfer Object -> Objeto de transferência de dados
// DTO -> Objeto simples -> Validar dados / transformar dados

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  //GET /recados/all_recados
  @Get('all_recados')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.recadosService.findAll();
  }

  //GET /recados/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(Number(id));
  }

  //Post /recados
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateRecadoDTO) {
    return this.recadosService.createRecado(dto);
  }

  //PATH /recados/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: AtulizaRecadosDTO) {
    return this.recadosService.updateRecado(Number(id), dto);
  }

  // DELETE /recados/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.recadosService.delete(Number(id));
  }
}
