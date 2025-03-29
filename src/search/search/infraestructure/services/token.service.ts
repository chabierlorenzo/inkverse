import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';

@Injectable()
export class TokenService {
  private readonly tokenBlacklist: Set<string> = new Set();
  private readonly tokenUsageCount: Map<string, number> = new Map();
  private readonly maxUsageCount = 100; // Máximo número de usos por token
  private readonly tokenExpiration = '1h'; // Expiración del token

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateToken(ip: string): string {
    const payload = {
      ip,
      jti: randomBytes(16).toString('hex'), // ID único del token
      iat: Math.floor(Date.now() / 1000), // Tiempo de emisión
      exp: Math.floor(Date.now() / 1000) + 3600, // Expiración en 1 hora
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      algorithm: 'HS256',
    });
  }

  validateToken(token: string, ip: string): boolean {
    try {
      // Verificar si el token está en la lista negra
      if (this.tokenBlacklist.has(token)) {
        return false;
      }

      // Verificar el uso del token
      const usageCount = this.tokenUsageCount.get(token) || 0;
      if (usageCount >= this.maxUsageCount) {
        this.revokeToken(token);
        return false;
      }

      // Verificar el token
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Verificar que la IP coincida
      if (payload.ip !== ip) {
        return false;
      }

      // Incrementar el contador de uso
      this.tokenUsageCount.set(token, usageCount + 1);

      return true;
    } catch (error) {
      console.error('Error al validar el token:', error);
      return false;
    }
  }

  revokeToken(token: string): void {
    this.tokenBlacklist.add(token);
    this.tokenUsageCount.delete(token);
  }

  // Método para limpiar tokens expirados
  cleanupExpiredTokens(): void {
    const now = Math.floor(Date.now() / 1000);
    for (const [token] of this.tokenUsageCount.entries()) {
      try {
        const payload = this.jwtService.verify(token, {
          secret: this.configService.get<string>('JWT_SECRET'),
        });
        if (payload.exp < now) {
          this.revokeToken(token);
        }
      } catch {
        this.revokeToken(token);
      }
    }
  }
}
