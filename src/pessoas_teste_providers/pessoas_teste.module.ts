/*
 * ============================================================
 * PROVIDERS: useClass | useValue | useFactory
 * ============================================================
 *
 * O NestJS oferece 3 formas de registrar providers customizados.
 * O shorthand `providers: [UserService]` é equivalente ao useClass.
 *
 * ------------------------------------------------------------
 * 1. useClass
 * ------------------------------------------------------------
 * Usado quando o NestJS deve instanciar a classe e gerenciar
 * seu ciclo de vida. Útil para trocar implementações por ambiente.
 *
 * providers: [
 *   {
 *     provide: UserService,
 *     useClass: process.env.NODE_ENV === 'test'
 *       ? UserServiceMock
 *       : UserService,
 *   },
 * ]
 *
 * ------------------------------------------------------------
 * 2. useValue
 * ------------------------------------------------------------
 * Usado para injetar um valor estático, objeto já instanciado
 * ou mock. Ideal para configurações, constantes ou mocks em testes.
 *
 * export const USER_CONFIG = 'USER_CONFIG';
 *
 * providers: [
 *   {
 *     provide: USER_CONFIG,
 *     useValue: {
 *       maxPasswordLength: 128,
 *       allowedDomains: ['empresa.com'],
 *     },
 *   },
 * ]
 *
 * // No UserService, injete com:
 * // constructor(@Inject(USER_CONFIG) private config: UserConfig) {}
 *
 * ------------------------------------------------------------
 * 3. useFactory
 * ------------------------------------------------------------
 * Usado quando a criação do provider depende de lógica assíncrona
 * ou de outros providers injetados. Ideal para serviços que
 * precisam de configuração externa (ex: bcrypt rounds, conexões).
 *
 * providers: [
 *   {
 *     provide: 'HASH_SERVICE',
 *     useFactory: (configService: ConfigService) => {
 *       const rounds = configService.get<number>('BCRYPT_ROUNDS');
 *       return new HashService(rounds);
 *     },
 *     inject: [ConfigService], // dependências passadas para a factory
 *   },
 * ]
 *
 * // Também suporta async:
 * // useFactory: async (configService: ConfigService) => {
 * //   const config = await configService.loadRemoteConfig();
 * //   return new HashService(config.rounds);
 * // }
 *
 * ------------------------------------------------------------
 * RESUMO
 * ------------------------------------------------------------
 * | Situação                                      | Use         |
 * |-----------------------------------------------|-------------|
 * | Registrar UserService normalmente             | useClass    |
 * | Injetar configurações estáticas ou mocks      | useValue    |
 * | Criar serviço que depende de config/async     | useFactory  |
 * ============================================================
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './pessoas_teste.service';
import { UserController } from './pessoas_teste.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class PessoasTesteModule {}
