import { Injectable } from '@nestjs/common';
import { CreateEmployeDTO, UpdateEmployeDTO } from './employe.dto';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeModule } from './employe.module';
import { Employe } from './employe.entity';
import { Store } from '../stores/store.entity';
import { StoresModule } from '../stores/stores.module';

@Injectable()
export class EmployeMapper {
  createDTOForEntity(dto: CreateEmployeDTO): Employe {
    return new Employe(dto);
  }

  updateDTOForEntity(dto: UpdateEmployeDTO): Employe {
    return new Employe(dto);
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'your-username',
      password: 'your-password',
      database: 'your-database',
      entities: [Store, Employe],
      synchronize: true,
    }),
    StoresModule,
    EmployeModule,
  ],
})
export class AppModule {}