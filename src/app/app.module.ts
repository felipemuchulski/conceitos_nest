import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitosAutomaticoModule } from 'src/conceitos-automatico/conceitos-automatico.module';

// um módulo pode exportar um módulo raiz em outro módulo
@Module({
  imports: [ConceitosAutomaticoModule],
  controllers: [AppController], // controla request e response
  providers: [AppService], // são utilizados para colocar a regra de negócio da aplicação
})
export class AppModule {}
