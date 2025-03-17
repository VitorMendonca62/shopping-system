import { Injectable } from '@nestjs/common';
import { CreateOutsourcedDTO, UpdateOutsourcedDTO } from './outsourced.dto';
import { Outsourced } from './outsourced.entity';

@Injectable()
export class OutsourcedMapper {
  createDTOForEntity(createOutsourcedDto: CreateOutsourcedDTO): Outsourced {
    const outsourced = new Outsourced(createOutsourcedDto);
    return outsourced;
  }

  updateDTOForEntity(updateOutsourcedDto: UpdateOutsourcedDTO): Outsourced {
    const outsourced = new Outsourced(updateOutsourcedDto);
    return outsourced;
  }
}