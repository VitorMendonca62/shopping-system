import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDTO } from './event.dto';
import { EventMapper } from './event.mapper';
import { validate } from 'class-validator';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly eventMapper: EventMapper
  ) {}

  @Post(':storeId')
  @ApiOperation({ summary: 'Cria um evento para uma loja' })
  @ApiResponse({ status: 201, description: 'O evento foi criado' })
  @ApiResponse({ status: 400, description: 'Houve um erro na criação do evento' })
  async create(@Param('storeId') storeId: number, @Body() createEventDto: CreateEventDTO) {
    const errors = await validate(createEventDto);
    
    if (errors.length > 0) {
      throw new BadRequestException('Falha na validação');
    }

    const event = this.eventMapper.createDTOForEntity(createEventDto);
    return this.eventService.create(storeId, event);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os eventos' })
  @ApiResponse({ status: 200, description: 'Retorna todos os eventos.' })
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id_evento')
  @ApiOperation({ summary: 'Obter um evento pelo id' })
  @ApiResponse({ status: 200, description: 'Retorna o evento.' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  findOneById(@Param('id_evento') id_evento: string) {
    return this.eventService.findOne(id_evento);
  }

  @Get(':storeId')
  @ApiOperation({ summary: 'Obter eventos de uma loja' })
  @ApiResponse({ status: 200, description: 'Retorna os eventos de uma loja.' })
  @ApiResponse({ status: 404, description: 'Loja não encontrada.' })
  findOne(@Param('storeId') storeId: string) {
    return this.eventService.findByStore(storeId);
  }

  @Delete(':id_evento')
  @ApiOperation({ summary: 'Excluir evento por id' })
  @ApiResponse({ status: 200, description: 'O evento foi excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  remove(@Param('id_evento') id_evento: string) {
    return this.eventService.remove(id_evento);
  }
}
