import { Controller, Get, Post, Body } from '@nestjs/common';
import { PasteService } from './paste.service';

@Controller('paste')
export class PasteController  {
    constructor(private readonly PasteService: PasteService) { }

    // 获取列表
    @Get('/get')
    getValue(): Promise<String> {
        const data = this.PasteService.get('paste');
        console.log(data)
        return this.PasteService.get('paste');
    }

    @Post('/set')
    setValue(@Body() req: any): Boolean {
        console.log(req)
        this.PasteService.set('paste', req.data);
        return true;
    }
}
