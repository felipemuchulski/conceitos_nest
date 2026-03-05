import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recado, Pessoa])],
  controllers: [RecadosController],
  providers: [RecadosService],
})
export class RecadosModule {}
