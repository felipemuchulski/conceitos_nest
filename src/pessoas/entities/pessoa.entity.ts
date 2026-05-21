import { IsEmail } from 'class-validator';
import { Recado } from 'src/recados/entities/recado.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column({ length: 255 })
  passwordHash!: string;

  @Column({ length: 100 })
  nome!: string;

  // Controle de bloqueio de usuário
  // default: true -> usuário ativo ao ser criado
  // Se mudar para false, o login e qualquer requisição autenticada são bloqueados
  @Column({ default: true })
  active!: boolean;

  // Controle de invalidação de tokens
  // Começa em 0. Quando incrementamos esse número no banco,
  // todos os tokens antigos (que carregam o número anterior) são rejeitados
  // Util para: logout forçado, troca de senham suspeita de comprometimento.
  @Column({ default: 0 })
  tokenVersion!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Recado, (recado) => recado.de)
  recadosEnviados!: Recado[];

  @OneToMany(() => Recado, (recado) => recado.para)
  recadosRecebidos!: Recado[];
}
