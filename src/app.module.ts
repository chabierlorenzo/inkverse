import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search/search.module';
import { CoreModule } from './core/core.module';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import { GoogleBooksModule } from './search/search-plugins/google-books/google-books.module';
import { PluginsModule } from './search/search-plugins/plugin-module/plugin.module';

@Module({
  imports: [
    HttpModule,
    PluginsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SearchModule,
    GoogleBooksModule,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
