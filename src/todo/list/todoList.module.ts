import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListController } from './todoList.controller';
import { TodoListService } from './todoList.service';
import { TodoList } from './todoList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList])],
  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule {}
