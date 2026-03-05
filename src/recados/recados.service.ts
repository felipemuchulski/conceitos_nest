import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadoDTO } from './dtos/create-recado.dto';
// import { Recado } from './types/types';
import { AtulizaRecadosDTO } from './dtos/atualizar-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

  async createRecado(dto: CreateRecadoDTO) {
    const novoRecado = {
      ...dto,
      data: new Date(),
    };

    const recado = this.recadoRepository.create(novoRecado);
    return this.recadoRepository.save(recado);
  }

  async updateRecado(id: number, dto: AtulizaRecadosDTO) {
    const partialUpdateRecadoDto = {
      lido: dto?.lido,
      texto: dto?.texto,
    };
    const recado = await this.recadoRepository.preload({ id, ...partialUpdateRecadoDto });
    if (!recado) {
      throw new NotFoundException(`Recado com o id ${id} não encontrado`);
    }
    return this.recadoRepository.save(recado);
  }

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({ where: { id } });
    if (!recado) {
      throw new NotFoundException(`Recado com o id ${id} não encontrado`);
    }
    return recado;
  }

  async delete(id: number) {
    const existeRecado = await this.recadoRepository.findOneBy({ id });

    if (!existeRecado) {
      throw new NotFoundException(`Recado com o id ${id} não encontrado`);
    }
    return this.recadoRepository.delete({ id });
  }
}
