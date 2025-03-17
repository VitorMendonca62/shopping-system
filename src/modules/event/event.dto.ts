import { IsString, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDTO {
  @ApiProperty({ description: 'Nome do evento', example: 'Promoção de Verão' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Data de início do evento', example: '2025-06-01T00:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  data_inicio: Date;

  @ApiProperty({ description: 'Data de término do evento', example: '2025-06-30T23:59:59.000Z' })
  @IsDate()
  @IsNotEmpty()
  data_termino: Date;

  @ApiProperty({ description: 'Localização do evento', example: 'Shopping Center' })
  @IsString()
  @IsNotEmpty()
  localizacao: string;

  @ApiPropertyOptional({ description: 'Descrição do evento', example: 'Descontos em todas as lojas' })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({ description: 'Tipo do evento', example: 'Promoção' })
  @IsString()
  @IsNotEmpty()
  tipo: string;
}