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

    // 获取链接host
    getHostName(url: string): any {
        if(!url) {
            return null;
        }

        const hostReg = /^https?:\/\/([\w-.]+(:\d+)?)/i;
        console.log(hostReg.exec(url));
        const regRes = hostReg.exec(url);
        // const origin = //i;
        return {
            origin: regRes[0],
            hostname: regRes[1]
        };
    }

    // 抓取icon
    async fetchOriginIcon(url: string): Promise<string> {
        let icon = '';
        // 添加的链接域名
        const hostName = this.getHostName(url);
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
            fs.mkdirSync(imgSavePath, { recursive: true });
        }

        const fileLocalPath = path.join(imgSavePath, fileName);

        if(fs.existsSync(fileLocalPath)) {
            return filePathPrefix + '/' + fileName;
        }

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

    // 获取网站的title
    @Post('/title')
    async fetchOriginTitle(@Body() data: any): Promise<string> {
        const url = data.url;

        console.log(url);
        if(!url) {
            return '';
        }
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36'
        }

        let title = '';

        // 获取网站的title
        await superagent.get(url)
            .set(headers)
            .timeout({
                response: 5000
            }).then(res => {
                if (200 === res.status) {
                    const htmlTitle = res.text.match(/<title.*>(.+)?<\/title>/i);
                    title = htmlTitle ? htmlTitle[1] : '';
                }
            }).catch(err => {
                console.error(err);
            });

        return title;
    }

    // 创建新链接
    @Post('/create')
    async createLink(@Body() data: LinkList): Promise<object> {
        if (!data && !data.url) {
            return null;
        }

        const title = data.title || '待定义';
        let url = data.url;

        if(!/^(http(s)?:)?\/\//.test(url)) {
            url = 'https://' + url;
        }

        // 添加的链接域名
        const hostName = this.getHostName(url);

        data.title = await this.fetchOriginTitle(url);
        data.icon = hostName.origin + '/favicon.ico';
        data.url = url;
        data.host = hostName.hostname;

        // 判断是否存在同名或者相同域名链接
        const isExist = await this.linkListService.checkExsit({
            title: title,
            url: url
        });

        if(isExist) {
          return { code: -1, data: null, msg: '数据已存在' };
        }

        return this.linkListService.create(data);
    }

    // 修改链接
    @Put('/edit/:id')
   async update(@Param('id') id: number, @Body() data: LinkList): Promise<boolean> {
        if(!id && !data) {
            return false;
        }

        if (data.url) {
            if(!/^(http(s)?:)?\/\//.test(data.url)) {
                data.url = 'https://' + data.url;
            }
    
            // data.icon = await this.fetchOriginIcon(data.url);
            data.host = this.getHostName(data.url);
        }

        console.log(data);
        const updateStatus = this.linkListService.update(id, data);
        return updateStatus;
    }

    // 删除链接
    @Delete('/del/:id')
    remove(@Param('id') id: number) {
        if(!id) {
            return false;
        }
        
        return this.linkListService.deleteOne(id);
    }
}
