import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TodoListService } from './todoList.service';
import { TodoList } from './todoList.entity';

@Controller('todo')
export class TodoListController {
  constructor(private readonly taskService: TodoListService) {}

  @Get()
  findAllTask(): Promise<TodoList[]> {
    return this.taskService.findAll();
  }

  @Post()
  createTask(@Body() data: TodoList): Promise<TodoList> {
    const res = this.taskService.create(data);
    return res;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: TodoList) {
    const updateStatus = this.taskService.update(id, data);
    return updateStatus;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskService.deleteOne(id);
  }
}
