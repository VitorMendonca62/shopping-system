import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EmployeService } from './employe.service';
import { CreateEmployeDTO, UpdateEmployeDTO } from './employe.dto';
import { EmployeMapper } from './employe.mapper';
import { validate } from 'class-validator';

@ApiTags('employe')
@Controller('employe')
export class EmployeController {
  constructor(
    private readonly employeService: EmployeService,
    private readonly employeMapper: EmployeMapper
  ) {}

  @Post(':storeId/:type')
  @ApiOperation({ summary: 'Cria um funcionário para uma loja ou empresa de serviços' })
  @ApiParam({name: 'type', enum: ['loja', 'empresa']})
  @ApiResponse({ status: 201, description: 'O funcionário foi criado' })
  @ApiResponse({ status: 400, description: 'Houve um erro na criação do funcionário' })
  async create(@Param('storeId') storeId: string, @Param('type') type: 'loja' | 'empresa', @Body() createEmployeDto: CreateEmployeDTO) {
    const errors = await validate(createEmployeDto);
    
    if (errors.length > 0) {
      throw new BadRequestException('Falha na validação');
    }

    const employe = this.employeMapper.createDTOForEntity(createEmployeDto);
    return this.employeService.create(storeId, type, employe);
  }

  @Get(':storeId')
  @ApiOperation({ summary: 'Obter todos os funcionários de uma loja ou empresa de serviços' })
  @ApiResponse({ status: 200, description: 'Retorna todos os funcionários.' })
  findByStore(@Param('storeId') storeId: string) {
    return this.employeService.findByStore(storeId);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os funcionários' })
  @ApiResponse({ status: 200, description: 'Retorna todos os funcionários.' })
  findAll() {
    return this.employeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter funcionário por id' })
  @ApiResponse({ status: 200, description: 'Retorna o funcionário.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.employeService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar funcionário por id' })
  @ApiResponse({ status: 200, description: 'O funcionário foi atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  async update(@Param('id') id: string, @Body() updateEmployeDto: UpdateEmployeDTO) {
    const employe = this.employeMapper.updateDTOForEntity(updateEmployeDto);
    const errors = await validate(employe);
    if (errors.length > 0) {
      throw new BadRequestException('Falha na validação');
    }
    return this.employeService.update(id, employe);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir funcionário por id' })
  @ApiResponse({ status: 200, description: 'O funcionário foi excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Funcionário não encontrado.' })
  remove(@Param('id') id: string) {
    return this.employeService.remove(id);
  }
}