import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  ip(): string {
    const forwardedFor = this.request.headers['x-forwarded-for'];
    if (forwardedFor) {
      return forwardedFor.toString().split(',')[0].trim();
    }
    return this.request.ip || this.request.connection.remoteAddress;
  }
}
