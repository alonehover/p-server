import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PasteController } from './paste.controller';
import { PasteService } from './paste.service';

@Module({
  // imports: [TypeOrmModule.forFeature([LinkList])],
  controllers: [PasteController],
  providers: [PasteService],
})
export class PasteModule {}
