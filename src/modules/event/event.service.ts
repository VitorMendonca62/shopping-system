import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { Store } from '../stores/store.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(storeId: number, event: Event): Promise<Event> {
    const result = await this.storeRepository.query(`SELECT * FROM lojas WHERE id = ?`, [storeId]);
    if (result.length === 0) {
      throw new NotFoundException('Loja não encontrada');
    }

    // Convertendo as datas para o formato correto
    const data_inicio = new Date(event.data_inicio).toISOString().slice(0, 19).replace('T', ' ');
    const data_termino = new Date(event.data_termino).toISOString().slice(0, 19).replace('T', ' ');

    await this.eventRepository.query(
      `INSERT INTO eventos (nome, data_inicio, data_termino, localizacao, descricao, tipo, idLoja) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [event.nome, data_inicio, data_termino, event.localizacao, event.descricao, event.tipo, storeId]
    );
    return event;
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.query(`SELECT * FROM eventos`);
  }

  async findByStore(storeId: string): Promise<Event[]> {
    const result = await this.storeRepository.query(`SELECT * FROM lojas WHERE id = ?`, [storeId]);
    if (result.length === 0) {
      throw new NotFoundException('Loja não encontrada');
    }
    
    return this.eventRepository.query(`SELECT * FROM eventos WHERE idLoja = ?`, [storeId]);
  }

  async findOne(id_evento: string): Promise<Event> {
    const result = await this.eventRepository.query(`SELECT * FROM eventos WHERE id = ?`, [id_evento]);
    if (result.length === 0) {
      throw new NotFoundException('Evento não encontrado');
    }
    return result[0];
  }

  async remove(id_evento: string): Promise<void> {
    const result = await this.eventRepository.query(`DELETE FROM eventos WHERE id = ?`, [id_evento]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('Evento não encontrado');
    }
  }
}
