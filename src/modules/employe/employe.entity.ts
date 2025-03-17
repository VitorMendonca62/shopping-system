import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateEmployeDTO, UpdateEmployeDTO } from './employe.dto';

@Entity({name: 'funcionarios'})
export class Employe {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({nullable: true})
  nome?: string;

  @Column({nullable: true})
  email?: string;

  @Column({nullable: true})
  funcao?: string;

  @Column({nullable: true, unique: true, length: 11})
  cpf?: string;
  
  @Column({nullable: true, unique: true})
  idLoja?: string;
  
  @Column({nullable: true, unique: true})
  idempresaserv?: string | null;

  constructor(data: CreateEmployeDTO | UpdateEmployeDTO) {
    if(data){
      if (data.nome) this.nome = data.nome;
      if (data.email) this.email = data.email;
      if (data.funcao) this.funcao = data.funcao;
      if (data.cpf) this.cpf = data.cpf;
    }
  }
}