import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { LinkList } from './linkList.entity';

@Injectable()
export class LinkListService {
    constructor(
        @InjectRepository(LinkList)
        private readonly linkListRepository: Repository<LinkList>,
    ) {}

    async findQuery(option: any = {}): Promise<LinkList[]> {
        return await this.linkListRepository.find({
            where: { 
                ...option,
                status: 1
            }
        });
    }

    async checkExsit(option: any = {}): Promise<boolean> {
        const list = await this.linkListRepository.find({
            where: [{
                title: option.title,
                status: 1
            }, {
                url: Like(`%${option.host}%`),
                status: 1
            }]
        });
        
        if(list.length) {
            return true;
        }

        return false;
    }

    async findOne(id: number): Promise<LinkList> {
        return await this.linkListRepository.findOneOrFail(id);
    }

    // create
    async create(task: LinkList): Promise<LinkList> {
        const res = this.linkListRepository.create(task);
        const result = this.linkListRepository.save(res);
        return result;
    }

    // update
    async update(id: number, task: LinkList): Promise<boolean> {
        return this.linkListRepository.update(id, task).then(res => res.raw.affectedRows > 0);
    }

    // delete one
    async deleteOne(id: number) {
        return this.linkListRepository.delete(id).then(res => res.raw.affectedRows > 0);
    }

    // delete multipe
    async delete(ids: number[]) {
        return this.linkListRepository.delete(ids).then(res => res.raw.affectedRows > 0);
    }
}
