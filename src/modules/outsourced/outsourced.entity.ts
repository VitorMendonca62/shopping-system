import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateOutsourcedDTO, UpdateOutsourcedDTO } from './outsourced.dto';

@Entity({ name: 'empresas_prestadoras_servico'})
export class Outsourced {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cnpj: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column({ default: 0 })
  quantidade_funcionarios: number;

  @Column()
  categoria: string;

  constructor(data: CreateOutsourcedDTO | UpdateOutsourcedDTO) {
    if(data){
      if(data.cnpj) this.cnpj = data.cnpj;
      if(data.nome) this.nome = data.nome;
      if(data.email) this.email = data.email;
      if(data.telefone) this.telefone = data.telefone;
      if(data.categoria) this.categoria = data.categoria;
    }
  }
}