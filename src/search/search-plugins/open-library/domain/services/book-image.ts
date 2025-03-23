import { Injectable } from '@nestjs/common';
import { OPENAPI_COVERS_URL } from '../const';

@Injectable()
export class OpenApiBookImage {
  getSmall(isbn: string): string {
    return this.getUrl(isbn, 'S');
  }

  getBig(isbn: string): string {
    return this.getUrl(isbn, 'L');
  }

  private getUrl(isbn: string, size: 'S' | 'M' | 'L'): string {
    return `${OPENAPI_COVERS_URL}/${isbn}-${size}.jpg`;
  }
}
