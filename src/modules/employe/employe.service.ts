import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employe } from './employe.entity';
import { CreateEmployeDTO, UpdateEmployeDTO } from './employe.dto';
import { Store } from '../stores/store.entity';

@Injectable()
export class EmployeService {
  constructor(
    @InjectRepository(Employe)
    private readonly employeRepository: Repository<Employe>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(storeId: string, type: 'loja' | 'empresa', employe: Employe): Promise<Employe> {
    const result = await this.storeRepository.query(`SELECT * FROM lojas WHERE id = ?`, [storeId]);
    if (result.length === 0) {
      throw new NotFoundException('Loja não encontrada');
    }

    if (type === 'loja') {
      employe.idLoja = storeId;
    } else if (type === 'empresa') {
      employe.idempresaserv = storeId;
    }
    
    await this.employeRepository.query(
      `INSERT INTO funcionarios (cpf, nome, funcao, email, idLoja, idempresaserv) VALUES (?, ?, ?, ?, ?, ?)`,
      [employe.cpf, employe.nome, employe.funcao, employe.email, employe.idLoja, employe.idempresaserv]
    );
    return employe;
  }

  async findByStore(storeId: string): Promise<Employe[]> {
    const result = await this.storeRepository.query(`SELECT * FROM lojas WHERE id = ?`, [storeId]);
    if (result.length === 0) {
      throw new NotFoundException('Loja não encontrada');
    }
  
    return this.employeRepository.query(`SELECT * FROM funcionarios WHERE idLoja = ? OR idempresaserv = ?`, [storeId, storeId]);
  }

  async findAll(): Promise<Employe[]> {
    return this.employeRepository.query(`SELECT * FROM funcionarios`);
  }

  async findOne(id: string): Promise<Employe> {
    const result = await this.employeRepository.query(`SELECT * FROM funcionarios WHERE id = ?`, [id]);
    if (result.length === 0) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return result[0];
  }

  async update(id: string, updateEmployeDto: UpdateEmployeDTO): Promise<Employe> {
    const result = await this.employeRepository.query(
      `UPDATE funcionarios SET cpf = COALESCE(?, cpf), nome = COALESCE(?, nome), funcao = COALESCE(?, funcao), email = COALESCE(?, email) WHERE id = ?`,
      [updateEmployeDto.cpf, updateEmployeDto.nome, updateEmployeDto.funcao, updateEmployeDto.email, id]
    );
    if (result.affectedRows === 0) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.employeRepository.query(`DELETE FROM funcionarios WHERE id = ?`, [id]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('Funcionário não encontrado');
    }
  }
}
