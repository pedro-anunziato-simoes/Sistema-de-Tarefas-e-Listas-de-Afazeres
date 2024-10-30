import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { ViewModule } from './view/view.module';
import { ViewController } from './view/view.controller';
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
    ViewModule,
    AuthModule,
    TaskModule
  ],
  controllers: [ViewController, AppController],
  providers: [AppService],
})
export class AppModule { }
