import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search/search.module';
import { CoreModule } from './core/core.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SearchModule,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
