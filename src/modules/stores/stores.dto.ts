import { IsString, IsNotEmpty, IsEmail, IsNumber, Matches, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export abstract class CreateStoresDTO {
  @ApiProperty({ description: 'Nome da loja', example: 'Loja Exemplo' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'CNPJ da loja no formato XXXXXXXXXXXXXX', example: '12345678000190' })
  @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  cnpj: string;

  @ApiProperty({ description: 'Categoria da loja', example: 'Roupas' })
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiProperty({ description: 'Valor do aluguel da loja', example: 1500.00 })
  @IsNumber()
  @IsNotEmpty()
  aluguel: number;

  @ApiProperty({ description: 'Telefone da loja com 11 dígitos', example: '11987654321' })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  telefone: string;

  @ApiProperty({ description: 'Email da loja', example: 'contato@lojaexemplo.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Número da sala da loja', example: '101' })
  @IsString()
  @IsNotEmpty()
  numeroSala: number;
}

export abstract class UpdateStoreDto {
  @ApiPropertyOptional({ description: 'Nome da loja', example: 'Loja Exemplo Atualizada' })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiPropertyOptional({ description: 'CNPJ da loja no formato XX.XXX.XXX/XXXX-XX', example: '12.345.678/0001-90' })
  @IsString()
  @IsOptional()
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, { message: 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX' })
  cnpj?: string;

  @ApiPropertyOptional({ description: 'Categoria da loja', example: 'Roupas' })
  @IsString()
  @IsOptional()
  categoria?: string;

  @ApiPropertyOptional({ description: 'Valor do aluguel da loja', example: 2000.00 })
  @IsNumber()
  @IsOptional()
  aluguel?: number;

  @ApiPropertyOptional({ description: 'Telefone da loja com 11 dígitos', example: '11987654321' })
  @IsString()
  @IsOptional()
  @Matches(/^\d{11}$/, { message: 'Telefone deve ter 11 dígitos' })
  telefone?: string;

  @ApiPropertyOptional({ description: 'Email da loja', example: 'contato@lojaexemplo.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Número da sala da loja', example: '102' })
  @IsString()
  @IsOptional()
  numeroSala?: number;
}