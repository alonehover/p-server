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
            select: ['id', 'name', 'sort', 'updated_time'],
            where: {
                ...option,
                status: 1
            },
            order: { sort: 'DESC', updated_time: 'DESC' }
        });
    }

    async findQuery(option: any = {}): Promise<any[]> {
        const res = await this.linkTagRepository
            .createQueryBuilder('tag')
            .select(['tag.name', 'links.title', 'links.url', 'links.icon'])
            .leftJoin('tag.links', 'links')
            .where('tag.status = 1')
            .andWhere('links.status = 1')
            .orderBy('links.click', 'DESC')
            .addOrderBy('tag.sort', 'DESC')
            .getMany();
        return res;
    }

    async findOne(id: number): Promise<LinkTag> {
        return await this.linkTagRepository.findOne(id, {
            select: ['id', 'name', 'sort', 'updated_time'],
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
