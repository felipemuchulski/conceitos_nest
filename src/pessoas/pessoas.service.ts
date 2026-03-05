import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoasRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const novaPessoa = this.pessoasRepository.create({
      email: createPessoaDto.email,
      passwordHash: createPessoaDto.passwordHash,
      nome: createPessoaDto.nome,
    });

    await this.pessoasRepository.save(novaPessoa);
    return novaPessoa;
  }

  async findAll() {
    const pessoas = await this.pessoasRepository.find();
    return pessoas;
  }

  async findOne(id: number) {
    const pessoa = await this.pessoasRepository.findOneBy({ id });
    if (!pessoa) {
      throw new NotFoundException(`Pessoa não encontrada com o id ${id}`);
    }
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
