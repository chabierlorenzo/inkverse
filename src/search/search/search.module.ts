import { Module } from '@nestjs/common';
import { SearchController } from './infraestructure/search.controller';
import { SearchResolver } from './infraestructure/graphql/search.resolver';
import { SearchOrchestationModule } from '../search-orchestation/search-orchestation.module';

@Module({
  imports: [SearchOrchestationModule],
  controllers: [SearchController],
  providers: [SearchResolver],
})
export class SearchModule {}
