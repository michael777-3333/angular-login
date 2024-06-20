import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ default: true })
  isActive: boolean;
}
