import { Injectable } from '@nestjs/common';
import { CreateRecadoDTO } from './dtos/create-recado.dto';
import { Recado } from './types/types';
import { AtulizaRecadosDTO } from './dtos/atualizar-recado.dto';

@Injectable()
export class RecadosService {
  private recados: Recado[] = [];

  createRecado(dto: CreateRecadoDTO) {
    const novo = { id: Date.now(), ...dto };
    this.recados.push(novo);
    return novo;
  }

  updateRecado(id: number, dto: AtulizaRecadosDTO) {
    const indice = this.recados.findIndex((recado) => recado.id === id);
    if (indice === -1) return null;

    this.recados[indice] = { ...this.recados[indice], ...dto };
    return this.recados[indice];
  }

  findAll() {
    return this.recados;
  }

  findOne(id: number) {
    return this.recados.find((recado) => recado.id == id);
  }

  delete(id: string) {
    this.recados = this.recados.filter((r) => r.id != id);
    return { deleted: true };
  }
}
