import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { taskEntity } from './entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './DTO/task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(taskEntity)
        private TaskRepository: Repository<taskEntity>
    ) { }

    findAll() {
        return this.TaskRepository.find();
    }

    create(@Body() taskDto: TaskDto) {
        const task = this.TaskRepository.create(taskDto);
        return this.TaskRepository.save(task);
    }

    async findById(@Param("id") id: string) {
        const user = await this.TaskRepository.findOneBy({ id });
        if (user === null) {
            throw new NotFoundException(`Usuario com id '${id}' não encontrado`);
        }
        return user;
    }

    async findByTitle(@Param("titulo") titulo: string) {
        const user = await this.TaskRepository.findOneBy({ titulo });
        if (user === null) {
            throw new NotFoundException(`Task com titulo: '${titulo}' não encontrada`);
        }
        return user;
    }

    async update(@Param("id") id: string, @Body() taskDto: TaskDto) {
        const task = await this.TaskRepository.findOneBy({ id });
        if (task === null) {
            throw new NotFoundException(`Task com id: '${id}' não encontrada`);
        }

        task.titulo = taskDto.titulo;
        task.descricao = taskDto.descricao;
        task.prioridade = taskDto.prioridade;
        task.cor = taskDto.cor

        return this.TaskRepository.save(task);
    }
    async delete(@Param("id") id: number) {
        await this.TaskRepository.delete(id);
    }
}
