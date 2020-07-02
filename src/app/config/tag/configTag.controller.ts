import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ConfigTagService } from './configTag.service';
import { ConfigTag } from './configTag.entity';

@Controller('config/tag')
export class ConfigTagController {
  constructor(private readonly configTagService: ConfigTagService) {}

  @Get()
  findAllConfigTag(): Promise<ConfigTag[]> {
    return this.configTagService.findAll();
  }

  @Post()
  createConfigTag(@Body() data: ConfigTag): Promise<ConfigTag> {
    const res = this.configTagService.create(data);
    return res;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: ConfigTag) {
    const updateStatus = this.configTagService.update(id, data);
    return updateStatus;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.configTagService.deleteOne(id);
  }
}
