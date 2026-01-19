import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        tenant: { connect: { id: tenantId } },
      },
      include: { contacts: true },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.customer.findMany({
      where: { tenantId },
      include: { contacts: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.customer.findUniqueOrThrow({
      where: { id },
      include: { contacts: true },
    });
  }

  async update(id: string, tenantId: string, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
      include: { contacts: true },
    });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }

  async search(tenantId: string, query: string) {
    return this.prisma.customer.findMany({
      where: {
        tenantId,
        OR: [
          { legalName: { contains: query, mode: 'insensitive' } },
          { tradeName: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
          { phone: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: { contacts: true },
    });
  }
}
