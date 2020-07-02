import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribeListController } from './subscribeList.controller';
import { SubscribeListService } from './subscribeList.service';
import { SubscribeList } from './subscribeList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscribeList])],
  controllers: [SubscribeListController],
  providers: [SubscribeListService],
})
export class SubscribeListModule {}
