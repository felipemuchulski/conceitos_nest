import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  @Column({ default: false })
  lido: boolean;

  @Column()
  data: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // muitos recaods podem ser enviados por uma única pesoa (emissor)
  @ManyToOne(() => Pessoa)
  // Específica a coluna "de" quer armazena o Id da pessoa que enviou o recado
  @JoinColumn({ name: 'de' })
  de: Pessoa;

  // Muitos recados podem ser enviados para um única pessoa (destinatário)
  @ManyToOne(() => Pessoa)
  //Específica a coluna "para" que armazena o ID da pessoa que recebe o recado
  @JoinColumn({ name: 'para' })
  para: Pessoa;
}
