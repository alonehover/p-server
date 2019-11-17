import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigList } from './configList.entity';

@Injectable()
export class ConfigListService {
    constructor(
        @InjectRepository(ConfigList)
        private readonly configListRepository: Repository<ConfigList>,
    ) {}

    async findAll(): Promise<ConfigList[]> {
        return await this.configListRepository.find();
    }

    // create a new todo
    async create(configList: ConfigList): Promise<ConfigList> {
        const res = this.configListRepository.create(configList);
        const result = this.configListRepository.save(res);
        return result;
    }

    // update a todo
    async update(id: number, configList: ConfigList): Promise<boolean> {
        return this.configListRepository.update(id, configList).then(res => res.raw.affectedRows > 0);
    }

    // delete a todo
    async deleteOne(id: number) {
        return this.configListRepository.delete(id);
    }

    // delete multipe todo
    async delete(ids: number[]) {
        return this.configListRepository.delete(ids);
    }
}
