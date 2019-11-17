import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkListController } from './linkList.controller';
import { LinkListService } from './linkList.service';
import { LinkList } from './linkList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinkList])],
  controllers: [LinkListController],
  providers: [LinkListService],
})
export class LinkListModule {}
