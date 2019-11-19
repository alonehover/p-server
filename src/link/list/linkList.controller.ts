import * as fs from 'fs';
import * as path from 'path';
import * as superagent from 'superagent';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LinkListService } from './linkList.service';
import { LinkList } from './linkList.entity';

@Controller('link')
export class LinkListController  {
    constructor(private readonly linkListService: LinkListService) { }

    // 获取列表
    @Get('/all')
    findAllLink(): Promise<any[]> {
        return this.linkListService.findQuery();
    }

    // 抓取icon
    async fetchOriginIcon(url: string): Promise<string> {
        let icon = '';
        const hostReg = /^http(s)?:\/\/[\w-.]+(:\d+)?/i;
        // 添加的链接域名
        const hostName = hostReg.exec(url)[0];
        // 待抓取图片路径
        const iconOriginUrl = hostName + '/favicon.ico';
        // 图片存储路径前缀
        const filePathPrefix = 'icon';
        // 图片存储后缀
        const fileExt = '.png';
        // 图片名 以域名命名
        const fileName = hostName.replace(/https?:\/\//, '').replace(/\./g, '_') + fileExt;
        // 图片存储绝对路径
        const imgSavePath = path.join(process.cwd(), '/public/img', filePathPrefix);

        if (!fs.existsSync(imgSavePath)) {
            fs.mkdirSync(imgSavePath);
        }

        const fileLocalPath = path.join(imgSavePath, fileName);

        console.log('fetch icon : ' + iconOriginUrl);

        // 获取网站的favicon.ico
        await superagent.get(iconOriginUrl)
            .timeout({
                response: 5000
            }).then(res => {
                if (200 === res.status) {
                    // favicon.ico地址存在, 抓取图片存储本地
                    superagent.get(iconOriginUrl)
                        .pipe(fs.createWriteStream(fileLocalPath));

                    icon = filePathPrefix + '/' + fileName;
                }
            }).catch(err => {
                console.error(err);
            });

        return icon;
    }

    // 创建新链接
    @Post()
    async createLink(@Body() data: LinkList): Promise<object> {
        if (!data.url) {
            return null;
        }

        const hostReg = /^http(s)?:\/\/[\w-.]+(:\d+)?/i;
        // 添加的链接域名
        const hostName = hostReg.exec(data.url)[0];

        // 判断是否存在同名或者相同域名链接
        const isExist = await this.linkListService.checkExsit({
          title: data.title,
          host: hostName
        });

        if(isExist) {
          return { code: -1, data: null, msg: '数据已存在' };
        }

        data.icon = await this.fetchOriginIcon(data.url);
        const res = this.linkListService.create(data);

        return res;
    }

    // 修改链接
    @Put(':id')
   async update(@Param('id') id: number, @Body() data: LinkList): Promise<boolean> {
        if(!id) {
            return false;
        }

        if(data.url) {
            data.icon = await this.fetchOriginIcon(data.url);
        }

        const updateStatus = this.linkListService.update(id, data);
        return updateStatus;
    }

    // 删除链接
    @Delete(':id')
    remove(@Param('id') id: number) {
        if(!id) {
            return false;
        }
        
        return this.linkListService.deleteOne(id);
    }
}
