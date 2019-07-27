import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('todo')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAllTask(): Promise<Task[]> {
    return this.taskService.findAll();
    // return new Promise(() => 'asdasda');
  }

  @Post()
  createTask(@Body() data: any): object {
    return {
      code: 1,
      data,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return `This action updates a #${id} task`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} task`;
  }
}
