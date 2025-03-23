import { Module } from '@nestjs/common';
import { ConsolidateService } from './domain/services/consolidate.service';

@Module({
  providers: [ConsolidateService],
  exports: [ConsolidateService],
})
export class SearchConsolidatorModule {}
