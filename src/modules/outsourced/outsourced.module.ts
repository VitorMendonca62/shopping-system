import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutsourcedController } from './outsourced.controller';
import { OutsourcedService } from './outsourced.service';
import { OutsourcedMapper } from './outsourced.mapper';
import { Outsourced } from './outsourced.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Outsourced])],
  controllers: [OutsourcedController],
  providers: [OutsourcedService, OutsourcedMapper],
})
export class OutsourcedModule {}
