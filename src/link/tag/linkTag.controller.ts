import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LinkTagService } from './linkTag.service';
import { LinkTag } from './linkTag.entity';

@Controller('link')
export class LinkTagController {
    constructor(private readonly linkTagService: LinkTagService) { }

    @Get()
    findAllLinkGroupTag(): Promise<LinkTag[]> {
        return this.linkTagService.findQuery();
    }

    @Get('/tag')
    findAllLinkTag(): Promise<LinkTag[]> {
        return this.linkTagService.findAll();
    }

    @Get('/tag/:id')
    findOneLinkTag(@Param('id') id: number): Promise<LinkTag> {
        return this.linkTagService.findOne(id);
    }

    @Post('/tag')
    async createLinkTag(@Body() data: LinkTag): Promise<any> {

        // 判断是否存在同名
        const isExist = await this.linkTagService.checkExsit({
            name: data.name
        });

        if (isExist) {
            return { code: -1, data: null, msg: '数据已存在' };
        }

        const res = this.linkTagService.create(data);
        return res;
    }

    @Put('/tag/:id')
    update(@Param('id') id: number, @Body() data: LinkTag) {
        if(!id) {
            return false;
        }
        
        const updateStatus = this.linkTagService.update(id, data);
        return updateStatus;
    }

    @Delete('/tag/:id')
    remove(@Param('id') id: number) {
        if(!id) {
            return false;
        }

        return this.linkTagService.deleteOne(id);
    }
}
