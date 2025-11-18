import { Module } from '@nestjs/common';
import { PhareService } from './phare.service';
import { PhareController } from './phare.controller';

@Module({
  providers: [PhareService],
  controllers: [PhareController],
})
export class PhareModule {}
