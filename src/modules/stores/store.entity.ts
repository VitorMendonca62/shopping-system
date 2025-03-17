import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateStoresDTO as CreateStoreDTO, UpdateStoreDto } from "./stores.dto";

@Entity({name: 'lojas'})
export class Store {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  numero_sala: number;

  @Column({length: 11, nullable: true})
  telefone?: string;

  @Column({nullable: true})
  email?: string;

  @Column({default: 0})
  quantidade_funcionarios?: number;

  @Column({length: 50, nullable: true})
  categoria?: string;

  @Column('decimal')
  aluguel: number;

  constructor(
    data: CreateStoreDTO | UpdateStoreDto
  ) {
    if(data){
      if(data.nome) this.nome = data.nome;
      if(data.cnpj) this.cnpj = data.cnpj;
      if(data.telefone) this.telefone = data.telefone;
      if(data.email) this.email = data.email;
      if(data.categoria) this.categoria = data.categoria;
      if(data.aluguel) this.aluguel = data.aluguel;
      if(data.aluguel) this.aluguel = data.aluguel;
      if(data.numeroSala) this.numero_sala = data.numeroSala;
  }
  }
}