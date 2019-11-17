import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAllTask(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  createTask(@Body() data: Task): Promise<Task> {
    const res = this.taskService.create(data);
    return res;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Task) {
    const updateStatus = this.taskService.update(id, data);
    return updateStatus;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskService.deleteOne(id);
  }
}
