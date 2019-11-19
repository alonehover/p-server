import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { LinkTag } from './linkTag.entity';

@Injectable()
export class LinkTagService {
    constructor(
        @InjectRepository(LinkTag)
        private readonly linkTagRepository: Repository<LinkTag>,
    ) {}

    async findAll(option: any = {}): Promise<LinkTag[]> {
        return await this.linkTagRepository.find({
            select: ['id', 'name', 'sort', 'updatedTime'],
            where: {
                ...option,
                status: 1
            },
            order: { sort: 'DESC', updatedTime: 'DESC' }
        });
    }

    // 简单的关联查询
    // async findQuery(option: any = {}): Promise<any> {
    //     const res = await this.linkTagRepository
    //         .createQueryBuilder('tag')
    //         .leftJoin(LinkList, 'links', 'links.tag_id = tag.id')
    //         .where('tag.status = 1')
    //         .andWhere('links.status = 1')
    //         .orderBy('links.click', 'DESC')
    //         .addOrderBy('tag.sort', 'DESC')
    //         .select(['tag.name as name', 'links.title', 'links.url', 'links.icon'])
    //         .getRawMany();
    //     return res;
    // }

    // 利用entity关联查询
    async findQuery(option: any = {}): Promise<any[]> {
        const res = await this.linkTagRepository
            .createQueryBuilder('tag')
            .leftJoin('tag.links', 'links')
            .where('tag.status = 1')
            .andWhere('links.status = 1')
            .orderBy('links.click', 'DESC')
            .addOrderBy('tag.sort', 'DESC')
            .select(['tag.name', 'links.title', 'links.url', 'links.icon', 'links.click'])
            .getMany();
        return res;
    }

    async findOne(id: number): Promise<LinkTag> {
        return await this.linkTagRepository.findOne(id, {
            select: ['id', 'name', 'sort', 'updatedTime'],
            where: { status: 1 }
        });
    } 

    async checkExsit(option: any = {}): Promise<boolean> {
        const list = await this.findAll(option);
        
        if(list.length) {
            return true;
        }

        return false;
    }

    // create a new link
    async create(task: LinkTag): Promise<LinkTag> {
        const res = this.linkTagRepository.create(task);
        const result = this.linkTagRepository.save(res);
        return result;
    }

    // update a link
    async update(id: number, task: LinkTag): Promise<boolean> {
        if(!id) {
            return false;
        }

        return this.linkTagRepository.update(id, task).then(res => res.raw.affectedRows > 0);
    }

    // delete a link
    async deleteOne(id: number) {
        return this.linkTagRepository.delete(id).then(res => res.raw.affectedRows > 0);
    }

    // delete multipe link
    async delete(ids: number[]) {
        return this.linkTagRepository.delete(ids).then(res => res.raw.affectedRows > 0);
    }
}
