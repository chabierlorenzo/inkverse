import { Module } from '@nestjs/common';
import { SearchPluginsService } from './search-plugins.service';

@Module({
  imports: [],
  providers: [SearchPluginsService],
  exports: [SearchPluginsService],
})
export class PluginsModule {}
