import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOutsourcedDTO {
  @ApiProperty({ description: 'CNPJ da empresa terceirizada', example: '12345678000199' })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({ description: 'Nome da empresa terceirizada', example: 'Empresa XYZ' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Email da empresa terceirizada', example: 'contato@empresa.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Telefone da empresa terceirizada', example: '1112341678' })
  @IsString()
  @IsNotEmpty()
  telefone: string;

  @ApiProperty({ description: 'Categoria da empresa terceirizada', example: 'Tecnologia' })
  @IsString()
  @IsNotEmpty()
  categoria: string;
}

export class UpdateOutsourcedDTO {
  @ApiPropertyOptional({ description: 'CNPJ da empresa terceirizada', example: '12345678000199' })
  @IsString()
  @IsOptional()
  cnpj?: string;

  @ApiPropertyOptional({ description: 'Nome da empresa terceirizada', example: 'Empresa XYZ' })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiPropertyOptional({ description: 'Email da empresa terceirizada', example: 'contato@empresa.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Telefone da empresa terceirizada', example: '1112345678' })
  @IsString()
  @IsOptional()
  telefone?: string;

  @ApiPropertyOptional({ description: 'Categoria da empresa terceirizada', example: 'Tecnologia' })
  @IsString()
  @IsOptional()
  categoria?: string;
}