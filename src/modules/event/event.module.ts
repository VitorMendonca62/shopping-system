import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventMapper } from './event.mapper';
import { Event } from './event.entity';
import { Store } from '../stores/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Store])],
  controllers: [EventController],
  providers: [EventService, EventMapper]
})
export class EventModule {}
