import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresModule } from './modules/stores/stores.module';
import { EmployeModule } from './modules/employe/employe.module';
import { EventModule } from './modules/event/event.module';
import { Store } from './modules/stores/store.entity';
import { Employe } from './modules/employe/employe.entity';
import { Event } from './modules/event/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: '12345678',
      database: 'shopping',
      entities: [Store, Employe, Event],
      synchronize: true,
    }),
    StoresModule,
    EmployeModule,
    EventModule,
  ],
})
export class AppModule {}
