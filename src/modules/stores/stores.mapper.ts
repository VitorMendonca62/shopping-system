import { Injectable } from '@nestjs/common';
import { Store } from './store.entity';
import { CreateStoresDTO, UpdateStoreDto } from './stores.dto';

@Injectable()
export class StoresMapper {
  createDTOForEntity(dto: CreateStoresDTO): Store {
    return new Store(dto);
  }

  updateDTOForEntity(dto: UpdateStoreDto): Store {
    return new Store(dto);
  }
};
