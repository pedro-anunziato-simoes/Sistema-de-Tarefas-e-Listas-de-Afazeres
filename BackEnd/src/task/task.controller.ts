import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './DTO/task.dto';


@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Get()
    findAll() {
        return this.taskService.findAll()
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
    updateUser(@Param("id") id: string, @Body() TaskDto: TaskDto) {
        return this.taskService.update(id, TaskDto);
    }

    @Delete("delete/:id")
    deleteUser(@Param("id") id: number) {
        return this.taskService.delete(id);
    }

}
