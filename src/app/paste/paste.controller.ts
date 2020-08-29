import { Controller, Get, Post, Body } from '@nestjs/common';
import { PasteService } from './paste.service';

@Controller('paste')
export class PasteController  {
    constructor(private readonly PasteService: PasteService) { }

    // 获取列表
    @Get('/get')
    async getValue(): Promise<String> {
        const data = await this.PasteService.get('paste');
        return data;
    }

    @Post('/set')
    async setValue(@Body() req: any): Promise<Boolean> {
        await this.PasteService.set('paste', req.words);
        return true;
    }
}
