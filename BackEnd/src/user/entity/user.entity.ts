
import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  senha: string;

  /* realação com as tasks de cada usuario

  @OneToMany(type => Task, Task => Task.user)
  Tasks: Task[]; */
}
