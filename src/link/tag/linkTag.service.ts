import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkTag } from './linkTag.entity';

@Injectable()
export class LinkTagService {
    constructor(
        @InjectRepository(LinkTag)
        private readonly linkTagRepository: Repository<LinkTag>,
    ) {}

    async findAll(option: any = {}): Promise<LinkTag[]> {
        return await this.linkTagRepository.find(option);
    }

    async findOne(id: number): Promise<LinkTag> {
        return await this.linkTagRepository.findOne(id);
    }

    // create a new link
    async create(task: LinkTag): Promise<LinkTag> {
        const res = this.linkTagRepository.create(task);
        const result = this.linkTagRepository.save(res);
        return result;
    }

    // update a link
    async update(id: number, task: LinkTag): Promise<boolean> {
        return this.linkTagRepository.update(id, task).then(res => res.raw.affectedRows > 0);
    }

    // delete a link
    async deleteOne(id: number) {
        return this.linkTagRepository.delete(id);
    }

    // delete multipe link
    async delete(ids: number[]) {
        return this.linkTagRepository.delete(ids);
    }
}
