import { Module } from '@nestjs/common';
import { RequestService } from './services/request.service';

@Module({
  providers: [RequestService],
  exports: [RequestService],
})
export class CoreModule {}
