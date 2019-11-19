import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { SubscribeList } from './subscribeList.entity';

@Injectable()
export class SubscribeListService {
    constructor(
        @InjectRepository(SubscribeList)
        private readonly subscribeListRepository: Repository<SubscribeList>,
    ) {}

    async findQuery(option: any = {}): Promise<SubscribeList[]> {
        return await this.subscribeListRepository.find({
            where: { 
                ...option,
                status: 1
            }
        });
    }

    async checkExsit(option: any = {}): Promise<boolean> {
        const list = await this.subscribeListRepository.find({
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

    async findOne(id: number): Promise<SubscribeList> {
        return await this.subscribeListRepository.findOneOrFail(id);
    }

    // create
    async create(task: SubscribeList): Promise<SubscribeList> {
        const res = this.subscribeListRepository.create(task);
        const result = this.subscribeListRepository.save(res);
        return result;
    }

    // update
    async update(id: number, task: SubscribeList): Promise<boolean> {
        return this.subscribeListRepository.update(id, task).then(res => res.raw.affectedRows > 0);
    }

    // delete one
    async deleteOne(id: number) {
        return this.subscribeListRepository.delete(id).then(res => res.raw.affectedRows > 0);
    }

    // delete multipe
    async delete(ids: number[]) {
        return this.subscribeListRepository.delete(ids).then(res => res.raw.affectedRows > 0);
    }
}
