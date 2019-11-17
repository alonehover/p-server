import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigTag } from './configTag.entity';

@Injectable()
export class ConfigTagService {
    constructor(
        @InjectRepository(ConfigTag)
        private readonly configTagRepository: Repository<ConfigTag>,
    ) {}

    async findAll(): Promise<ConfigTag[]> {
        return await this.configTagRepository.find();
    }

    // create a new todo
    async create(configTag: ConfigTag): Promise<ConfigTag> {
        const res = this.configTagRepository.create(configTag);
        const result = this.configTagRepository.save(res);
        return result;
    }

    // update a todo
    async update(id: number, configTag: ConfigTag): Promise<boolean> {
        return this.configTagRepository.update(id, configTag).then(res => res.raw.affectedRows > 0);
    }

    // delete a todo
    async deleteOne(id: number) {
        return this.configTagRepository.delete(id);
    }

    // delete multipe todo
    async delete(ids: number[]) {
        return this.configTagRepository.delete(ids);
    }
}
