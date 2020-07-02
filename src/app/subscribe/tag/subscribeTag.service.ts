import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { SubscribeTag } from './subscribeTag.entity';

@Injectable()
export class SubscribeTagService {
    constructor(
        @InjectRepository(SubscribeTag)
        private readonly subscribeTagRepository: Repository<SubscribeTag>,
    ) {}

    async findAll(option: any = {}): Promise<SubscribeTag[]> {
        return await this.subscribeTagRepository.find({
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
    //     const res = await this.subscribeTagRepository
    //         .createQueryBuilder('tag')
    //         .leftJoin(SubscribeList, 'subscribes', 'subscribes.tag_id = tag.id')
    //         .where('tag.status = 1')
    //         .andWhere('subscribes.status = 1')
    //         .orderBy('subscribes.click', 'DESC')
    //         .addOrderBy('tag.sort', 'DESC')
    //         .select(['tag.name as name', 'subscribes.title', 'subscribes.url', 'subscribes.icon'])
    //         .getRawMany();
    //     return res;
    // }

    // 利用entity关联查询
    async findQuery(option: any = {}): Promise<any[]> {
        const res = await this.subscribeTagRepository
            .createQueryBuilder('tag')
            .leftJoin('tag.subscribes', 'subscribes')
            .where('tag.status = 1')
            .andWhere('subscribes.status = 1')
            .orderBy('subscribes.click', 'DESC')
            .addOrderBy('tag.sort', 'DESC')
            .select(['tag.name', 'subscribes.title', 'subscribes.url', 'subscribes.icon', 'subscribes.click'])
            .getMany();
        return res;
    }

    async findOne(id: number): Promise<SubscribeTag> {
        return await this.subscribeTagRepository.findOne(id, {
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

    // create a new subscribe
    async create(task: SubscribeTag): Promise<SubscribeTag> {
        const res = this.subscribeTagRepository.create(task);
        const result = this.subscribeTagRepository.save(res);
        return result;
    }

    // update a subscribe
    async update(id: number, task: SubscribeTag): Promise<boolean> {
        if(!id) {
            return false;
        }

        return this.subscribeTagRepository.update(id, task).then(res => res.raw.affectedRows > 0);
    }

    // delete a subscribe
    async deleteOne(id: number) {
        return this.subscribeTagRepository.delete(id).then(res => res.raw.affectedRows > 0);
    }

    // delete multipe subscribe
    async delete(ids: number[]) {
        return this.subscribeTagRepository.delete(ids).then(res => res.raw.affectedRows > 0);
    }
}
