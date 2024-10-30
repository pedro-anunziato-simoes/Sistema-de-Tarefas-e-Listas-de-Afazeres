
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class taskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    prioridade: string;

    @Column()
    cor: string;

    /* realação com as tasks de cada usuario
  
    @OneToMany(type => Task, Task => Task.user)
    Tasks: Task[]; */
}
