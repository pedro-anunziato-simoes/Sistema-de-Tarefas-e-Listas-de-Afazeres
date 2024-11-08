import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './DTO/task.dto';
import { Public } from 'src/auth/constants';
import { taskEntity } from './entity/task.entity';


@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Get()
    findAll() {
        return this.taskService.findAll()
    }

    @Post("move")
    moveStatus(@Body() id: taskEntity) {
        return this.taskService.move(id)
    }

    @Post()
    create(@Body() taskDto: TaskDto) {
        return this.taskService.create(taskDto);
    }

    @Get("findId/:id")
    findById(@Param("id") id: string) {
        return this.taskService.findById(id);
    }

    @Get("findTitle/:title")
    findByTitle(@Param("title") title: string) {
        return this.taskService.findByTitle(title);
    }

    @Put(":id")
    updateTask(@Param("id") id: string, @Body() TaskDto: TaskDto) {
        return this.taskService.update(id, TaskDto);
    }

    @Delete("delete/:id")
    deleteTask(@Param("id") id: string) {
        return this.taskService.delete(id);
    }

}
