import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LinkTagService } from './linkTag.service';
import { LinkTag } from './linkTag.entity';

@Controller('link/tag')
export class LinkTagController {
  constructor(private readonly linkTagService: LinkTagService) {}

  @Get()
  findAllLinkTag(): Promise<LinkTag[]> {
    return this.linkTagService.findAll();
  }

  @Post()
  createLinkTag(@Body() data: LinkTag): Promise<LinkTag> {
    const res = this.linkTagService.create(data);
    return res;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: LinkTag) {
    const updateStatus = this.linkTagService.update(id, data);
    return updateStatus;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.linkTagService.deleteOne(id);
  }
}
