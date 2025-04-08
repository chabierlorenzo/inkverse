import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search/search.module';
import { CoreModule } from './core/core.module';
import { SecurityModule } from './core/security/security.module';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import { GoogleBooksModule } from './search/search-plugins/google-books/google-books.module';
import { PluginsModule } from './search/search-plugins/plugin-module/plugin.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DataHarvestingModule } from './search/search-plugins/data-harvesting/data-harvesting.module';

@Module({
  imports: [
    HttpModule,
    PluginsModule,
    SecurityModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    SearchModule,
    GoogleBooksModule,
    DataHarvestingModule,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
