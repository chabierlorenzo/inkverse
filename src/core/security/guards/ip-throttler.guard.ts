import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class IpThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Request): Promise<string> {
    // Intentar obtener la IP real del cliente desde los headers
    const forwardedFor = req.headers['x-forwarded-for'];
    const realIp = req.headers['x-real-ip'];

    let ip = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : typeof forwardedFor === 'string'
        ? forwardedFor.split(',')[0]
        : (realIp as string);

    // Si no se encuentra en los headers, usar la IP directa
    if (!ip) {
      ip = req.ip;
    }

    // Para localhost, generar un identificador aleatorio
    if (ip === '::1' || ip === '127.0.0.1') {
      console.log('Localhost detected, generating random IP: ', ip);
      ip = Math.random().toString(16).slice(2, 8);
    }

    console.log('IP Throttler Guard');
    console.log('Request IP:', ip);
    return ip;
  }
}
