import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSuppliersDTO, UpdateSuppliersDTO } from './suppliers.dto';
import { Supplier } from './suppliers.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly suppliersRepository: Repository<Supplier>,
  ) {}

  async create(createSuppliersDTO: CreateSuppliersDTO): Promise<Supplier> {
    const result = await this.suppliersRepository.query(
      `INSERT INTO fornecedores (cnpj, nome, categoria, quantidade_funcionarios) VALUES (?, ?, ?, ?)`,
      [createSuppliersDTO.cnpj, createSuppliersDTO.nome, createSuppliersDTO.categoria, createSuppliersDTO.quantidade_funcionarios]
    );
    return result[0];
  }

  async findAll(): Promise<Supplier[]> {
    const result = await this.suppliersRepository.query(`SELECT id, cnpj, nome, categoria, quantidade_funcionarios FROM fornecedores`);
    if (result.length === 0) {
      throw new NotFoundException('Suppliers not found');
    }
    return result;
  }

  async findOne(id: number): Promise<Supplier> {
    const result = await this.suppliersRepository.query(`SELECT * FROM fornecedores WHERE id = ?`, [id]);
    if (result.length === 0) {
      throw new NotFoundException('Supplier not found');
    }
    return result[0];
  }

  async update(id: number, updateSuppliersDTO: UpdateSuppliersDTO): Promise<Supplier> {
    const result = await this.suppliersRepository.query(
      `UPDATE fornecedores SET cnpj = COALESCE(?, cnpj), nome = COALESCE(?, nome), categoria = COALESCE(?, categoria), quantidade_funcionarios = COALESCE(?, quantidade_funcionarios) WHERE id = ?`,
      [updateSuppliersDTO.cnpj, updateSuppliersDTO.nome, updateSuppliersDTO.categoria, updateSuppliersDTO.quantidade_funcionarios, id]
    );

    if (result.affectedRows === 0) {
      throw new NotFoundException('Supplier not found');
    }
    const updatedSupplier = await this.findOne(id);
    return updatedSupplier;
  }

  async remove(id: number): Promise<void> {
    const result = await this.suppliersRepository.query(`DELETE FROM fornecedores WHERE id = ?`, [id]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('Supplier not found');
    }
  }
}