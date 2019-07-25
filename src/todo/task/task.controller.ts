import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('todo')
export class TaskController {

  @Get()
  findAllTask(): string {
    return 'task api';
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
