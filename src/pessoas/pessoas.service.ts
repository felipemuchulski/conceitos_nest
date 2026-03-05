import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    const emailExiste = await this.pessoasRepository.findOneBy({
      email: createPessoaDto.email,
    });

    if (emailExiste) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const novaPessoa = this.pessoasRepository.create({
      email: createPessoaDto.email,
      passwordHash: createPessoaDto.password,
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
    const { password, ...anotherInfos } = updatePessoaDto;

    const pessoa = await this.pessoasRepository.preload({
      id,
      ...anotherInfos,
      passwordHash: password,
    });

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }

    return this.pessoasRepository.save(pessoa);
  }

  // remove não deve ser permitido a pessoa se apagar da base de dados
  async remove(id: number) {
    const existePessoa = await this.pessoasRepository.findOneBy({ id });

    if (!existePessoa) {
      throw new NotFoundException(`Pessoa com o id ${id} não encontrada`);
    }

    return this.pessoasRepository.delete({ id });
  }
}
