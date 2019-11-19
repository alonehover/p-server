import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SubscribeTagService } from './subscribeTag.service';
import { SubscribeTag } from './subscribeTag.entity';

@Controller('subscribe')
export class SubscribeTagController {
    constructor(private readonly subscribeTagService: SubscribeTagService) { }

    @Get()
    findAllSubscribeGroupTag(): Promise<SubscribeTag[]> {
        return this.subscribeTagService.findQuery();
    }

    @Get('/tag')
    findAllSubscribeTag(): Promise<SubscribeTag[]> {
        return this.subscribeTagService.findAll();
    }

    @Get('/tag/:id')
    findOneSubscribeTag(@Param('id') id: number): Promise<SubscribeTag> {
        return this.subscribeTagService.findOne(id);
    }

    @Post('/tag')
    async createSubscribeTag(@Body() data: SubscribeTag): Promise<any> {

        // 判断是否存在同名
        const isExist = await this.subscribeTagService.checkExsit({
            name: data.name
        });

        if (isExist) {
            return { code: -1, data: null, msg: '数据已存在' };
        }

        const res = this.subscribeTagService.create(data);
        return res;
    }

    @Put('/tag/:id')
    update(@Param('id') id: number, @Body() data: SubscribeTag) {
        if(!id) {
            return false;
        }
        
        const updateStatus = this.subscribeTagService.update(id, data);
        return updateStatus;
    }

    @Delete('/tag/:id')
    remove(@Param('id') id: number) {
        if(!id) {
            return false;
        }

        return this.subscribeTagService.deleteOne(id);
    }
}
