import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkTagController } from './linkTag.controller';
import { LinkTagService } from './linkTag.service';
import { LinkTag } from './linkTag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinkTag])],
  controllers: [LinkTagController],
  providers: [LinkTagService],
})
export class LinkTagModule {}
