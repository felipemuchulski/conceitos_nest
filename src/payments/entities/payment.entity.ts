import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNumber()
  amountCents!: number;

  @Column()
  @IsNumber()
  userId!: number;

  @Column({ unique: true })
  @IsString()
  reference!: string;

  @Column()
  @IsIn(['pix', 'stripe'])
  provider!: 'pix' | 'stripe';

  @Column({ nullable: true })
  @IsString()
  externalId?: string; // o Id que o gateway retornou

  @Column({ default: 'pending' })
  @IsIn(['pending', 'paid', 'failed', 'cancelled'])
  status!: 'pending' | 'paid' | 'failed' | 'cancelled';

  @Column()
  @IsOptional()
  @IsIn(['BRL'])
  currency? = 'BRL';

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
