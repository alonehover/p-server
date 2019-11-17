import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LinkListService } from './linkList.service';
import { LinkList } from './linkList.entity';
import { identifier } from '@babel/types';

@Controller('link')
export class LinkListController {
  constructor(private readonly linkListService: LinkListService) {}

  // 获取列表
  @Get()
  findAllTask(): Promise<LinkList[]> {
    return this.linkListService.findAll({
      url: 'https://www.baidu.com'
    });
  }

  // 创建新链接
  @Post()
  createTask(@Body() data: LinkList): any {
    if(!data.url) {
      return null;
    }

    const hostReg = /^http(s)?:\/\/[\w-.]+(:\d+)?/i;

    const hostName = hostReg.exec(data.url)[0];
    const iconOriginUrl = hostName + '/favicon.ico';
    
    const fileName = hostName.replace(/https?:\/\//, '').replace(/\./g, '_') + '.png';
    const filePrefix = 'icon';
    const imgSavePath = path.join(process.cwd(), '/public/img', filePrefix);

    if(!fs.existsSync(imgSavePath)) {
      fs.mkdirSync(imgSavePath);
    }

    const fileLocalPath = path.join(imgSavePath, fileName);

    let icon = '';

    // 获取网站的favicon.ico
    request(iconOriginUrl, (err, res) => {
      if(res.statusCode == 200) {
        console.log(iconOriginUrl, fileLocalPath);
        
        res.pipe(fs.createWriteStream(fileLocalPath));
        icon = filePrefix + '/' + fileName;
      }
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
