import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeController } from './employe.controller';
import { EmployeService } from './employe.service';
import { EmployeMapper } from './employe.mapper';
import { Employe } from './employe.entity';
import { Store } from '../stores/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employe, Store])],
  controllers: [EmployeController],
  providers: [EmployeService, EmployeMapper],
})
export class EmployeModule {}
