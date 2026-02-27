import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// um módulo pode exportar um módulo raiz em outro módulo
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // deixa disponível para o app inteiro
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '1433', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // Carrega entidades sem precisar especifica-las
      synchronize: true,
      options: {
        encrypt: false, // desativa a exigencia de TLS
        trustServerCertificate: true, // aceita certificado autoassinado
        enableArithAbort: true,
      }, // Sincroniza tudo que estou fazendo com o Banco de Dados, não deve ser usado em prod
    }),
    RecadosModule,
  ],
  controllers: [AppController], // controla request e response
  providers: [AppService], // são utilizados para colocar a regra de negócio da aplicação
})
export class AppModule {}
