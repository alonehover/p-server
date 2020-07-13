import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule} from 'nestjs-redis'

import DBConfig from '../config/DB.config'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TodoListModule } from './app/todo/list/todoList.module';
import { LinkListModule } from './app/link/list/linkList.module';
import { LinkTagModule } from './app/link/tag/linkTag.module';

import { TodoList } from './app/todo/list/todoList.entity';

@Module({
  imports: [
    RedisModule.register(DBConfig.redis),
    TypeOrmModule.forRoot(),
    TodoListModule,
    LinkListModule,
    LinkTagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
