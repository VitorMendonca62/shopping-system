import { IsString, IsNotEmpty, IsEmail, IsOptional, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeDTO {
  @ApiProperty({ description: 'CPF do empregado', example: '12345678900' })
  @IsString()
  @Matches(/^\d{11}$/, { message: 'CPF deve conter exatamente 11 dígitos' })
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ description: 'Nome do empregado', example: 'João' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Função do empregado', example: 'Gerente' })
  @IsString()
  @IsNotEmpty()
  funcao: string;

  @ApiProperty({ description: 'Email do empregado', example: 'joao.silva@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdateEmployeDTO {
  @ApiPropertyOptional({ description: 'CPF do empregado', example: '12345678900' })
  @IsString()
  @Matches(/^\d{11}$/, { message: 'CPF deve conter exatamente 11 dígitos' })
  @IsOptional()
  cpf?: string;

  @ApiPropertyOptional({ description: 'Nome do empregado', example: 'João' })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiPropertyOptional({ description: 'Função do empregado', example: 'Gerente' })
  @IsString()
  @IsOptional()
  funcao?: string;

  @ApiPropertyOptional({ description: 'Email do empregado', example: 'joao.silva@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;
}
