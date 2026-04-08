import { forwardRef, Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { Pessoa } from './entities/pessoa.entity';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa]), forwardRef(() => RecadosModule)],
  controllers: [PessoasController],
  providers: [PessoasService],
  exports: [PessoasService], // ao importar esse módulo em outro módulo, eu posso utilizar tudo que está dentro do service.
})
export class PessoasModule {}
