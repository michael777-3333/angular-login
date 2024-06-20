import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
