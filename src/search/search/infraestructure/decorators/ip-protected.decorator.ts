import { applyDecorators, UseGuards } from '@nestjs/common';
import { IpGuard } from '../guards/ip.guard';

export function IpProtected() {
  return applyDecorators(UseGuards(IpGuard));
}
