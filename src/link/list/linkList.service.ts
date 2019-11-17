import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkList } from './linkList.entity';

@Injectable()
export class LinkListService {
    constructor(
        @InjectRepository(LinkList)
        private readonly linkListRepository: Repository<LinkList>,
    ) {}

    async findAll(option: any = {}): Promise<LinkList[]> {
        return await this.linkListRepository.find(option);
    }

    async findAndCount(option: any = {}): Promise<[LinkList[], number]> {
        return await this.linkListRepository.findAndCount(option);
    }

    async findOne(id: number): Promise<LinkList> {
        return await this.linkListRepository.findOneOrFail(id);
    }

    // create a new todo
    async create(task: LinkList): Promise<LinkList> {
        const res = this.linkListRepository.create(task);
        const result = this.linkListRepository.save(res);
        return result;
    }

    // update a todo
    async update(id: number, task: LinkList): Promise<boolean> {
        return this.linkListRepository.update(id, task).then(res => res.raw.affectedRows > 0);
    }

    // delete a todo
    async deleteOne(id: number) {
        return this.linkListRepository.delete(id);
    }

    // delete multipe todo
    async delete(ids: number[]) {
        return this.linkListRepository.delete(ids);
    }
}
