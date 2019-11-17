import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoList } from './todoList.entity';

@Injectable()
export class TodoListService {
    constructor(
        @InjectRepository(TodoList)
        private readonly taskRepository: Repository<TodoList>,
    ) {}

    async findAll(): Promise<TodoList[]> {
        return await this.taskRepository.find();
    }

    // create a new todo
    async create(task: TodoList): Promise<TodoList> {
        const res = this.taskRepository.create(task);
        const result = this.taskRepository.save(res);
        return result;
    }

    // update a todo
    async update(id: number, task: TodoList): Promise<boolean> {
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
