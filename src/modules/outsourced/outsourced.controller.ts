import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OutsourcedService } from './outsourced.service';
import { CreateOutsourcedDTO, UpdateOutsourcedDTO } from './outsourced.dto';
import { OutsourcedMapper } from './outsourced.mapper';
import { validate } from 'class-validator';

@ApiTags('outsourced')
@Controller('outsourced')
export class OutsourcedController {
  constructor(
    private readonly outsourcedService: OutsourcedService,
    private readonly outsourcedMapper: OutsourcedMapper
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma empresa terceirizada' })
  @ApiResponse({ status: 201, description: 'A empresa terceirizada foi criada' })
  @ApiResponse({ status: 400, description: 'Houve um erro na criação da empresa terceirizada' })
  async create(@Body() createOutsourcedDto: CreateOutsourcedDTO) {
    const errors = await validate(createOutsourcedDto);
    if (errors.length > 0) {
      throw new BadRequestException('Falha na validação');
    }

    const outsourced = this.outsourcedMapper.createDTOForEntity(createOutsourcedDto);
    return this.outsourcedService.create(outsourced);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as empresas terceirizadas' })
  @ApiResponse({ status: 200, description: 'Retorna todas as empresas terceirizadas.' })
  findAll() {
    return this.outsourcedService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter empresa terceirizada por id' })
  @ApiResponse({ status: 200, description: 'Retorna a empresa terceirizada.' })
  @ApiResponse({ status: 404, description: 'Empresa terceirizada não encontrada.' })
  findOne(@Param('id') id: number) {
    return this.outsourcedService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar empresa terceirizada por id' })
  @ApiResponse({ status: 200, description: 'A empresa terceirizada foi atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Empresa terceirizada não encontrada.' })
  async update(@Param('id') id: number, @Body() updateOutsourcedDto: UpdateOutsourcedDTO) {
    const errors = await validate(updateOutsourcedDto);
    if (errors.length > 0) {
      throw new BadRequestException('Falha na validação');
    }

    const outsourced = this.outsourcedMapper.updateDTOForEntity(updateOutsourcedDto);
    return this.outsourcedService.update(id, outsourced);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir empresa terceirizada por id' })
  @ApiResponse({ status: 200, description: 'A empresa terceirizada foi excluída com sucesso.' })
  @ApiResponse({ status: 404, description: 'Empresa terceirizada não encontrada.' })
  remove(@Param('id') id: number) {
    return this.outsourcedService.remove(id);
  }
}
