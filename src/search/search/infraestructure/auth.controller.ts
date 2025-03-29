import { Controller, Post, UseGuards } from '@nestjs/common';
import { TokenService } from './services/token.service';
import { IpGuard } from './guards/ip.guard';
import { RequestService } from 'src/core/services/request.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly req: RequestService,
  ) {}

  @Post('token')
  @UseGuards(IpGuard)
  generateToken() {
    const clientIp = this.req.ip();
    return {
      token: this.tokenService.generateToken(clientIp),
      expiresIn: '1h',
    };
  }
}
