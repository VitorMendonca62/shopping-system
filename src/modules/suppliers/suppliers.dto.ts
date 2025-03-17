import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSuppliersDTO {
  @ApiProperty({ description: 'CNPJ do fornecedor', example: '12345678000199' })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({ description: 'Nome do fornecedor', example: 'Fornecedor XYZ' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Categoria do fornecedor', example: 'Eletrônicos' })
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiProperty({ description: 'Quantidade de funcionários', example: 50 })
  @IsNumber()
  @IsNotEmpty()
  quantidade_funcionarios: number;
}

export class UpdateSuppliersDTO {
  @ApiPropertyOptional({ description: 'CNPJ do fornecedor', example: '12345678000199' })
  @IsString()
  @IsOptional()
  cnpj?: string;

  @ApiPropertyOptional({ description: 'Nome do fornecedor', example: 'Fornecedor XYZ' })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiPropertyOptional({ description: 'Categoria do fornecedor', example: 'Eletrônicos' })
  @IsString()
  @IsOptional()
  categoria?: string;

  @ApiPropertyOptional({ description: 'Quantidade de funcionários', example: 50 })
  @IsNumber()
  @IsOptional()
  quantidade_funcionarios?: number;
}