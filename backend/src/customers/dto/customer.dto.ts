import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  legalName: string;

  @IsOptional()
  @IsString()
  tradeName?: string;

  @IsOptional()
  @IsString()
  taxId?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  legalName?: string;

  @IsOptional()
  @IsString()
  tradeName?: string;

  @IsOptional()
  @IsString()
  taxId?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
