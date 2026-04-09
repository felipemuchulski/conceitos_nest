import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNumber()
  amountCents!: number;

  @Column({ unique: true })
  @IsString()
  reference!: string;

  @Column()
  @IsOptional()
  @IsIn(['BRL'])
  currency? = 'BRL';

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
