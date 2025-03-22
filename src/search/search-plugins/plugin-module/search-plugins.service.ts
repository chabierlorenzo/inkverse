import { Injectable } from '@nestjs/common';
import { SearchStrategyPort } from '../../search/domain/ports/search.port';

@Injectable()
export class SearchPluginsService {
  private plugins: Map<string, SearchStrategyPort> = new Map();

  registerPlugin(name: string, plugin: SearchStrategyPort) {
    this.plugins.set(name, plugin);
  }

  getPlugin(name: string): SearchStrategyPort {
    const plugin = this.plugins.get(name);
    if (!plugin) {
      throw new Error(`Plugin ${name} no encontrado`);
    }
    return plugin;
  }

  getAllPlugins(): SearchStrategyPort[] {
    return Array.from(this.plugins.values());
  }
}
