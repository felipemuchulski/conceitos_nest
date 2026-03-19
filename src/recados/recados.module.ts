import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { PessoasModule } from '../pessoas/pessoas.module';
import { RecadosUtils } from './recado.utils';

// Fazer da forma extensa para o aprendizado, mas usar da forma simples
@Module({
  imports: [TypeOrmModule.forFeature([Recado, Pessoa]), forwardRef(() => PessoasModule)],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RecadosUtils,
      useClass: RecadosUtils,
    },
  ],
  exports: [
    {
      provide: RecadosUtils,
      useClass: RecadosUtils,
    },
  ],
})
export class RecadosModule {}
