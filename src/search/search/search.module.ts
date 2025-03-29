import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SearchController } from './infraestructure/search.controller';
import { SearchResolver } from './infraestructure/graphql/search.resolver';
import { SearchOrchestationModule } from '../search-orchestation/search-orchestation.module';
import { SearchConsolidatorModule } from '../search-consolidator/search-consolidator.module';
import { TokenService } from './infraestructure/services/token.service';
import { TokenGuard } from './infraestructure/guards/token.guard';
import { AuthController } from './infraestructure/auth.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    CoreModule,
    SearchOrchestationModule,
    SearchConsolidatorModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { algorithm: 'HS256' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [SearchController, AuthController],
  providers: [SearchResolver, TokenService, TokenGuard],
})
export class SearchModule {}
