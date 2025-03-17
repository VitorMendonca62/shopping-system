import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateEventDTO } from './event.dto';

@Entity({name: 'eventos'})
export class Event {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome?: string;

  @Column()
  data_inicio?: Date;

  @Column()
  data_termino?: Date;

  @Column()
  localizacao?: string;

  @Column()
  descricao?: string;

  @Column()
  tipo?: string;

  @Column()
  idLoja?: number;

  constructor(data: CreateEventDTO) {
    if(data){
      if (data.nome) this.nome = data.nome;
      if (data.data_inicio) this.data_inicio = data.data_inicio;
      if (data.data_termino) this.data_termino = data.data_termino;
      if (data.localizacao) this.localizacao = data.localizacao;
      if (data.descricao) this.descricao = data.descricao;
      if (data.tipo) this.tipo = data.tipo;
    }
  }
}