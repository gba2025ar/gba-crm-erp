import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('system')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Información general del sistema' })
  getInfo() {
    return this.appService.getInfo();
  }

  @Get('health')
  @ApiOkResponse({ description: 'Estado de salud de la API' })
  health() {
    return this.appService.getHealth();
  }
}
