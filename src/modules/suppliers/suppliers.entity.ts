import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateSuppliersDTO, UpdateSuppliersDTO } from './suppliers.dto';

@Entity({ name: 'fornecedores' })
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cnpj: string;

  @Column()
  nome: string;

  @Column()
  categoria: string;

  @Column()
  quantidade_funcionarios: number;

  constructor(data: CreateSuppliersDTO | UpdateSuppliersDTO) {
    if(data){
      if(data.nome) this.nome = data.nome;
      if(data.cnpj) this.cnpj = data.cnpj;
      if(data.categoria) this.categoria = data.categoria;
      if(data.quantidade_funcionarios) this.quantidade_funcionarios = data.quantidade_funcionarios;
    }
  }
}