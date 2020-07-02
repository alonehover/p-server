import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ConfigListService } from './configList.service';
import { ConfigList } from './configList.entity';

@Controller('config')
export class ConfigListController {
  constructor(private readonly configListService: ConfigListService) {}

  @Get()
  findAllConfigList(): Promise<ConfigList[]> {
    return this.configListService.findAll();
  }

  @Post()
  createConfigList(@Body() data: ConfigList): Promise<ConfigList> {
    const res = this.configListService.create(data);
    return res;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: ConfigList) {
    const updateStatus = this.configListService.update(id, data);
    return updateStatus;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.configListService.deleteOne(id);
  }
}
