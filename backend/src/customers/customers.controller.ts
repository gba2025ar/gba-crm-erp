import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    if (!createCustomerDto.legalName) {
      throw new BadRequestException('legalName es requerido');
    }
    // Por ahora usamos un tenantId fijo; luego se agregará autenticación
    const tenantId = 'default-tenant';
    return this.customersService.create(tenantId, createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes' })
  async findAll() {
    const tenantId = 'default-tenant';
    return this.customersService.findAll(tenantId);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar clientes' })
  @ApiResponse({ status: 200, description: 'Clientes encontrados' })
  async search(@Query('q') query: string) {
    if (!query || query.length < 2) {
      throw new BadRequestException('Query debe tener al menos 2 caracteres');
    }
    const tenantId = 'default-tenant';
    return this.customersService.search(tenantId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener cliente por ID' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  async findOne(@Param('id') id: string) {
    const tenantId = 'default-tenant';
    return this.customersService.findOne(id, tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar cliente' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado' })
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    const tenantId = 'default-tenant';
    return this.customersService.update(id, tenantId, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar cliente' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado' })
  async remove(@Param('id') id: string) {
    const tenantId = 'default-tenant';
    return this.customersService.remove(id, tenantId);
  }
}
