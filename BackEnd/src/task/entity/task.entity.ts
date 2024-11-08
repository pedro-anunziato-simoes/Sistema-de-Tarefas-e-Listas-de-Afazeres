
import { DefaultValuePipe } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class taskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsNotEmpty()
    @Column()
    titulo: string;

    @IsNotEmpty()
    @Column()
    descricao: string;

    @IsNotEmpty()
    @Column()
    prioridade: string;

    @IsNotEmpty()
    @Column()
    cor: string;

    @IsNotEmpty()
    @Column('varchar',{default: 'A fazer'})
    status: string;

    /* realação com as tasks de cada usuario
  
    @OneToMany(type => Task, Task => Task.user)
    Tasks: Task[]; */
}
