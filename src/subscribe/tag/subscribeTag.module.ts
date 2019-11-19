import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribeTagController } from './subscribeTag.controller';
import { SubscribeTagService } from './subscribeTag.service';
import { SubscribeTag } from './subscribeTag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscribeTag])],
  controllers: [SubscribeTagController],
  providers: [SubscribeTagService],
})
export class SubscribeTagModule {}
