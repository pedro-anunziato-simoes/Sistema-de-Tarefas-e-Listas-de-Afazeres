import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { taskEntity } from './entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([taskEntity])],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService,TaskModule]
})
export class TaskModule {}

