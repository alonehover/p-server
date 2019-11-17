import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TodoListModule } from './todo/list/todoList.module';
import { LinkListModule } from './link/list/linkList.module';
import { LinkTagModule } from './link/tag/linkTag.module';

import { TodoList } from './todo/list/todoList.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TodoListModule,
    LinkListModule,
    LinkTagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
