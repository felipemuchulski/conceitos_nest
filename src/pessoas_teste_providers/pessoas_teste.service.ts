import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/updtate-user.dto';
//Repositório acessa dados;
//Entidade representa dados

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // Injetando o repositório da entida User
    private readonly userRepository: Repository<User>, // tipa o repositório como sendo User
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailExist = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (emailExist) {
      throw new ConflictException('Email já existe cadastrado na base de dados');
    }

    const newUser = this.userRepository.create({
      name: createUserDto.name,
      passwordHash: createUserDto.password,
      email: createUserDto.email,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const userId = await this.userRepository.findOneBy({
      id: id,
    });

    if (!userId) {
      throw new NotFoundException('Não encontrado id com esse usuário');
    }
    return userId;
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const { password } = updatePasswordDto;

    const user = await this.userRepository.preload({
      id,
      passwordHash: password,
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const userRemove = await this.userRepository.findOneBy({ id });

    if (!userRemove) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.userRepository.remove(userRemove);
  }
}
