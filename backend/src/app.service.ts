import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MenuService } from './menu/menu.service';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly menuService: MenuService,
  ) {}

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  getInfo() {
    return {
      app: this.configService.get<string>('app.name') ?? 'GBA CRM-ERP',
      version: this.configService.get<string>('app.version') ?? '0.1.0',
      sections: this.menuService.getMenu().map((section) => ({
        key: section.key,
        title: section.title,
        options: section.options.length,
      })),
    };
  }
}
