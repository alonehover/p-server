import { Controller, Get, Post, Body } from '@nestjs/common';
import { TranslateService } from './translate.service';

@Controller('translate')
export class TranslateController  {
    constructor(private readonly TranslateService: TranslateService) { }

    // 获取列表
    @Post('/')
    translate(@Body() data: any): any {
        const { words } = data
        const res = this.TranslateService.search(words);
        console.log(words)
        return res;
    }
}
