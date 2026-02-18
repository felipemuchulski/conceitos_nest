import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadoDTO } from './dtos/create-recado.dto';
import { Recado } from './types/types';
import { AtulizaRecadosDTO } from './dtos/atualizar-recado.dto';

@Injectable()
export class RecadosService {
  private recados: Recado[] = [];

  createRecado(dto: CreateRecadoDTO) {
    const novo = { id: Date.now(), ...dto, lido: false, data: new Date() };
    this.recados.push(novo);
    return novo;
  }

  updateRecado(id: number, dto: AtulizaRecadosDTO) {
    const indice = this.recados.findIndex((recado) => recado.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Recado com o id ${id} não encontrado`);
    }

    this.recados[indice] = { ...this.recados[indice], ...dto };
    return this.recados[indice];
  }

  findAll() {
    return this.recados;
  }

  findOne(id: number) {
    const recado = this.recados.find((recado) => recado.id === id);

    if (!recado) {
      throw new NotFoundException(`Recado com o id ${id} não encontrado`);
    }
    return this.recados.find((recado) => recado.id == id);
  }

  delete(id: number) {
    const existRecord = this.recados.find((recado) => recado.id === id);
    if (!existRecord) {
      throw new NotFoundException(`Recado com id ${id} não encontrado`);
    }

    this.recados = this.recados.filter((r) => r.id != id);
    return { deleted: true };
  }
}
