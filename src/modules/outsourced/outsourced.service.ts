import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Outsourced } from './outsourced.entity';
import { CreateOutsourcedDTO, UpdateOutsourcedDTO } from './outsourced.dto';

@Injectable()
export class OutsourcedService {
  constructor(
    @InjectRepository(Outsourced)
    private readonly outsourcedRepository: Repository<Outsourced>,
  ) {}

  async create(createOutsourcedDTO: CreateOutsourcedDTO): Promise<Outsourced> {
    const result = await this.outsourcedRepository.query(
      `INSERT INTO empresas_terceiras (cnpj, nome, email, telefone, categoria) VALUES (?, ?, ?, ?, ?)`,
      [createOutsourcedDTO.cnpj, createOutsourcedDTO.nome, createOutsourcedDTO.email, createOutsourcedDTO.telefone, createOutsourcedDTO.categoria]
    );
    return result[0];
  }

  async findAll(): Promise<Outsourced[]> {
    const result = await this.outsourcedRepository.query(`SELECT id, cnpj, nome, email, telefone, categoria FROM empresas_terceiras`);
    if (result.length === 0) {
      throw new NotFoundException('Empresas terceirizadas não encontradas');
    }
    return result;
  }

  async findOne(id: number): Promise<Outsourced> {
    const result = await this.outsourcedRepository.query(`SELECT * FROM empresas_terceiras WHERE id = ?`, [id]);
    if (result.length === 0) {
      throw new NotFoundException('Empresa terceirizada não encontrada');
    }
    return result[0];
  }

  async update(id: number, updateOutsourcedDTO: UpdateOutsourcedDTO): Promise<Outsourced> {
    const result = await this.outsourcedRepository.query(
      `UPDATE empresas_terceiras SET cnpj = COALESCE(?, cnpj), nome = COALESCE(?, nome), email = COALESCE(?, email), telefone = COALESCE(?, telefone), categoria = COALESCE(?, categoria) WHERE id = ?`,
      [updateOutsourcedDTO.cnpj, updateOutsourcedDTO.nome, updateOutsourcedDTO.email, updateOutsourcedDTO.telefone, updateOutsourcedDTO.categoria, id]
    );

    if (result.affectedRows === 0) {
      throw new NotFoundException('Empresa terceirizada não encontrada');
    }
    const updatedOutsourced = await this.findOne(id);
    return updatedOutsourced;
  }

  async remove(id: number): Promise<void> {
    const result = await this.outsourcedRepository.query(`DELETE FROM empresas_terceiras WHERE id = ?`, [id]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('Empresa terceirizada não encontrada');
    }
  }
}
