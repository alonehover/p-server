import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SubscribeListService } from './subscribeList.service';
import { SubscribeList } from './subscribeList.entity';

@Controller('subscribe')
export class SubscribeListController  {
    constructor(private readonly subscribeListService: SubscribeListService) { }

    // 获取列表
    @Get('/all')
    findAllSubscribe(): Promise<any[]> {
        return this.subscribeListService.findQuery();
    }

    // 创建新订阅
    @Post()
    async createSubscribe(@Body() data: SubscribeList): Promise<object> {
        const res = this.subscribeListService.create(data);

        return res;
    }

    // 修改订阅
    @Put(':id')
   async update(@Param('id') id: number, @Body() data: SubscribeList): Promise<boolean> {
        if(!id) {
            return false;
        }

        const updateStatus = this.subscribeListService.update(id, data);
        return updateStatus;
    }

    // 删除订阅
    @Delete(':id')
    remove(@Param('id') id: number) {
        if(!id) {
            return false;
        }
        
        return this.subscribeListService.deleteOne(id);
    }
}
