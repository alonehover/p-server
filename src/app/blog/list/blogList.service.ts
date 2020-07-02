import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './blogList.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    // create a new todo
    async create(task: Task): Promise<Task> {
        const res = this.taskRepository.create(task);
        const result = this.taskRepository.save(res);
        return result;
    }

    // update a todo
    async update(id: number, task: Task): Promise<boolean> {
        return this.taskRepository.update(id, task).then(res => res.raw.affectedRows > 0);
    }

    // delete a todo
    async deleteOne(id: number) {
        return this.taskRepository.delete(id);
    }

    // delete multipe todo
    async delete(ids: number[]) {
        return this.taskRepository.delete(ids);
    }
}
