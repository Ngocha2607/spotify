import { Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(private devConfigService: DevConfigService) {}
  getHello(): string {
    return `Hello, I am learning Nestjs Fundamentals with ${this.devConfigService.getDBHOST()}!`;
  }
}
