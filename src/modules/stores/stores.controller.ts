import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StoresService } from './stores.service';
import { CreateStoresDTO, UpdateStoreDto } from './stores.dto';
import { StoresMapper } from './stores.mapper';
import { validate } from 'class-validator';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly storesMapper: StoresMapper
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria lojas do shopping' })
  @ApiResponse({ status: 201, description: 'A loja foi criada' })
  @ApiResponse({ status: 400, description: 'Houve um erro na criação da loja' })
  async create(@Body() createStoreDto: CreateStoresDTO) {
    const errors = await validate(createStoreDto);
    
    if (errors.length > 0) {
      throw new BadRequestException('Falha na validação');
    }

    const store = this.storesMapper.createDTOForEntity(createStoreDto);
    return this.storesService.create(store);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as lojas' })
  @ApiResponse({ status: 200, description: 'Retorna todas as lojas.' })
  @ApiResponse({ status: 404, description: 'Lojas não encontradas.' })

  findAll() {
    return this.storesService.findAll();
  }

  @Get(':cnpj')
  @ApiOperation({ summary: 'Obter loja por cnpj' })
  @ApiResponse({ status: 200, description: 'Retorna a loja.' })
  @ApiResponse({ status: 404, description: 'Loja não encontrada.' })
  findOne(@Param('cnpj') cnpj: string) {
    return this.storesService.findOne(cnpj);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar loja por id' })
  @ApiResponse({ status: 200, description: 'A loja foi atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Loja não encontrada.' })
  async update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    const store = this.storesMapper.updateDTOForEntity(updateStoreDto);
    const errors = await validate(store);
    if (errors.length > 0) {
      throw new BadRequestException('Falha na validação');
    }
    return this.storesService.update(id, store);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir loja por id' })
  @ApiResponse({ status: 200, description: 'A loja foi excluída com sucesso.' })
  @ApiResponse({ status: 404, description: 'Loja não encontrada.' })
  remove(@Param('id') id: string) {
    return this.storesService.remove(id);
  }
}
