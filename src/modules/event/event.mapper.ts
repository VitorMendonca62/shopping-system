import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { CreateEventDTO } from './event.dto';

@Injectable()
export class EventMapper {
  createDTOForEntity(dto: CreateEventDTO): Event {
    return new Event(dto);
  }
}