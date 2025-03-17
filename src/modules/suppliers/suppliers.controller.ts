import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuppliersService } from './suppliers.service';
import { CreateSuppliersDTO, UpdateSuppliersDTO } from './suppliers.dto';
import { SuppliersMapper } from './suppliers.mapper';
import { validate } from 'class-validator';

@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
    private readonly suppliersMapper: SuppliersMapper
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um fornecedor' })
  @ApiResponse({ status: 201, description: 'O fornecedor foi criado' })
  @ApiResponse({ status: 400, description: 'Houve um erro na criação do fornecedor' })
  async create(@Body() createSuppliersDto: CreateSuppliersDTO) {
    const errors = await validate(createSuppliersDto);
    if (errors.length > 0) {
      throw new BadRequestException('Falha na validação');
    }

    const supplier = this.suppliersMapper.createDTOForEntity(createSuppliersDto);
    return this.suppliersService.create(supplier);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os fornecedores' })
  @ApiResponse({ status: 200, description: 'Retorna todos os fornecedores.' })
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter fornecedor por id' })
  @ApiResponse({ status: 200, description: 'Retorna o fornecedor.' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado.' })
  findOne(@Param('id') id: number) {
    return this.suppliersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar fornecedor por id' })
  @ApiResponse({ status: 200, description: 'O fornecedor foi atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado.' })
  async update(@Param('id') id: number, @Body() updateSuppliersDto: UpdateSuppliersDTO) {
    const errors = await validate(updateSuppliersDto);
    if (errors.length > 0) {
      throw new BadRequestException('Falha na validação');
    }

    const supplier = this.suppliersMapper.updateDTOForEntity(updateSuppliersDto);
    return this.suppliersService.update(id, supplier);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir fornecedor por id' })
  @ApiResponse({ status: 200, description: 'O fornecedor foi excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Fornecedor não encontrado.' })
  remove(@Param('id') id: number) {
    return this.suppliersService.remove(id);
  }
}