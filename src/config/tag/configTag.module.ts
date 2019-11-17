import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigTagController } from './configTag.controller';
import { ConfigTagService } from './configTag.service';
import { ConfigTag } from './configTag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigTag])],
  controllers: [ConfigTagController],
  providers: [ConfigTagService],
})
export class TaskModule {}
