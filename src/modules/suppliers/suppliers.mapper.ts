import { Injectable } from '@nestjs/common';
import { CreateSuppliersDTO, UpdateSuppliersDTO } from './suppliers.dto';
import { Supplier as Supplier } from './suppliers.entity';

@Injectable()
export class SuppliersMapper {
  createDTOForEntity(createSuppliersDto: CreateSuppliersDTO): Supplier {
   return new Supplier(createSuppliersDto);
  }

  updateDTOForEntity(updateSuppliersDto: UpdateSuppliersDTO): Supplier {
    return new Supplier(updateSuppliersDto);
  }
}