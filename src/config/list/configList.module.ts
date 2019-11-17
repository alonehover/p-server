import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigListController } from './configList.controller';
import { ConfigListService } from './configList.service';
import { ConfigList } from './configList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigList])],
  controllers: [ConfigListController],
  providers: [ConfigListService],
})
export class TaskModule {}
