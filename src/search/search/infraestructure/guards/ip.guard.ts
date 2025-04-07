import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class IpGuard implements CanActivate {
  private readonly allowedIps: string[] = ['82.223.99.167', '::1', '127.0.0.1'];

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedOrigins = ['https://pre.sintinta.com', 'https://sintinta.com'];
    const request = this.getRequest(context);
    const clientIp = this.getClientIp(request);
    const origin = request.headers.origin || request.headers.host;

    console.log('IP Guard - Client IP:', clientIp);
    console.log('IP Guard - Origin:', origin);
    console.log('IP Guard - Headers:', request.headers);

    // Permitir peticiones desde los orígenes permitidos
    if (origin && allowedOrigins.includes(origin)) {
      return true;
    }

    return this.allowedIps.includes(clientIp);
  }

  private getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  private getClientIp(request: any): string {
    const forwardedFor = request.headers['x-forwarded-for'];
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim();
    }
    return request.ip || request.connection.remoteAddress;
  }
}
