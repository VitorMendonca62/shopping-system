import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoresDTO, UpdateStoreDto } from './stores.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(store: Store): Promise<Store> {
    const result = await this.storeRepository.query(
      `INSERT INTO lojas (nome, cnpj, telefone, email, categoria, aluguel, numero_sala) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [store.nome, store.cnpj, store.telefone, store.email, store.categoria, store.aluguel, store.numero_sala]
    );
    return result[0];
  }

  async findAll(): Promise<Store[]> {
    const result=  await this.storeRepository.query(`SELECT id, cnpj, nome, numero_sala, telefone, email, quantidade_funcionarios categoria, aluguel FROM lojas;`);
    if (result.affectedRows === 0) {
      throw new NotFoundException('Loja não encontrada');
    }
    return result;
  }

  async findOne(cnpj: string): Promise<Store> {
    const result = await this.storeRepository.query(`SELECT * FROM lojas WHERE cnpj = ?`, [cnpj]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('Loja não encontrada');
    }
    return result[0];
  }

  async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const result = await this.storeRepository.query(
      `UPDATE lojas SET nome = COALESCE(?, nome), cnpj = COALESCE(?, cnpj), telefone = COALESCE(?, telefone), email = COALESCE(?, email), categoria = COALESCE(?, categoria), aluguel = COALESCE(?, aluguel), numero_sala = COALESCE(?, numero_sala) WHERE id = ?`,
      [id, updateStoreDto.nome, updateStoreDto.cnpj, updateStoreDto.telefone, updateStoreDto.email, updateStoreDto.categoria, updateStoreDto.aluguel, updateStoreDto.numeroSala]
    );

    if (result.affectedRows === 0) {
      throw new NotFoundException('Loja não encontrada');
    }
    const updatedStore = await this.findOne(updateStoreDto.cnpj);
    return updatedStore;
  }

  async remove(id: string): Promise<void> {
    const result = await this.storeRepository.query(`DELETE FROM lojas WHERE id = ?`, [id]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('Loja não encontrada');
    }
  }
}
