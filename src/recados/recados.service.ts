import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadoDTO } from './dtos/create-recado.dto';
import { AtulizaRecadosDTO } from './dtos/atualizar-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { Repository } from 'typeorm';
import { PessoasService } from '../pessoas/pessoas.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
  ) {}

  async createRecado(dto: CreateRecadoDTO) {
    const { deId, paraId } = dto;
    // Achar pessoa que está criando o recado
    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);
    // Achar a pessoa que está recebendo o recado
    const novoRecado = {
      texto: dto.texto,
      de,
      para,
      data: new Date(),
    };

    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  async updateRecado(id: number, dto: AtulizaRecadosDTO) {
    const recado = await this.findOne(id);

    recado.texto = dto?.texto ?? recado.texto;
    recado.lido = dto?.lido ?? recado.lido;

    await this.recadoRepository.save(recado);
    return recado;
  }

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findAllPagination(paginationDto?: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto ?? {};

    const recados = await this.recadoRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      order: {
        id: 'desc',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

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
