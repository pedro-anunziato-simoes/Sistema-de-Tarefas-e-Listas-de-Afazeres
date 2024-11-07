import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { taskEntity } from './task/entity/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'todolist',
      entities: [UserEntity,taskEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
