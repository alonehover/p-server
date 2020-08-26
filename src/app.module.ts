import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule} from 'nestjs-redis'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TodoListModule } from './app/todo/list/todoList.module';

import { LinkListModule } from './app/link/list/linkList.module';
import { LinkTagModule } from './app/link/tag/linkTag.module';

import { PasteModule } from './app/paste/paste.module';
import { TranslateModule } from './app/translate/translate.module';

// import { TodoList } from './app/todo/list/todoList.entity';
const DBConfig = require('../config/db.config')
 
@Module({
  imports: [
    RedisModule.register(DBConfig.redis),
    TypeOrmModule.forRoot(),
    TodoListModule,
    LinkListModule,
    LinkTagModule,
    PasteModule,
    TranslateModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
