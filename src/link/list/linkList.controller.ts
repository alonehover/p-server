import * as fs from 'fs';
import * as path from 'path';
import * as superagent from 'superagent';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LinkListService } from './linkList.service';
import { LinkList } from './linkList.entity';
import { identifier } from '@babel/types';

@Controller('link')
export class LinkListController {
    constructor(private readonly linkListService: LinkListService) { }

    // 获取列表
    @Get()
    findAllTask(): Promise<LinkList[]> {
        return this.linkListService.findAll();
    }

    // 创建新链接
    @Post()
    async createTask(@Body() data: LinkList): Promise<any> {
        if (!data.url) {
            return null;
        }

        const isExist = await this.linkListService.checkExsit({
          title: data.title,
          url: data.url
        });

        if(isExist) {
          return { code: -1, data: null, msg: '数据已存在' };
        }

        const hostReg = /^http(s)?:\/\/[\w-.]+(:\d+)?/i;

        const hostName = hostReg.exec(data.url)[0];
        const iconOriginUrl = hostName + '/favicon.png';

        const fileName = hostName.replace(/https?:\/\//, '').replace(/\./g, '_') + '.ico';
        const filePrefix = 'icon';
        const imgSavePath = path.join(process.cwd(), '/public/img', filePrefix);

        if (!fs.existsSync(imgSavePath)) {
            fs.mkdirSync(imgSavePath);
        }

        const fileLocalPath = path.join(imgSavePath, fileName);

        let icon = '';
        console.log('fetch icon : ' + iconOriginUrl);

        // 获取网站的favicon.ico
        await superagent.get(iconOriginUrl)
            .timeout({
                response: 3000
            }).then(res => {
                if (200 === res.status) {
                    superagent.get(iconOriginUrl)
                        .pipe(fs.createWriteStream(fileLocalPath));

                    icon = filePrefix + '/' + fileName;
                }
            }).catch(err => {
                console.error(err);
            });

        data.icon = icon;
        const res = this.linkListService.create(data);

        return res;
    }

    // 修改链接
    @Put(':id')
    update(@Param('id') id: number, @Body() data: LinkList) {
        const updateStatus = this.linkListService.update(id, data);
        return updateStatus;
    }

    // 删除链接
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.linkListService.deleteOne(id);
    }
}
