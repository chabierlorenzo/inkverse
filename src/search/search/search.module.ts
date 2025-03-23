import { Module } from '@nestjs/common';
import { SearchController } from './infraestructure/search.controller';
import { SearchResolver } from './infraestructure/graphql/search.resolver';
import { SearchOrchestationModule } from '../search-orchestation/search-orchestation.module';
import { SearchConsolidatorModule } from '../search-consolidator/search-consolidator.module';

@Module({
  imports: [SearchOrchestationModule, SearchConsolidatorModule],
  controllers: [SearchController],
  providers: [SearchResolver],
})
export class SearchModule {}
