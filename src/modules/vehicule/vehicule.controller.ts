/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { VehiculeServiceService } from './vehicule-service.service';

@Controller('vehicule')
export class VehiculeController {
    vehiculeService: VehiculeServiceService;
    constructor(vehicule:VehiculeServiceService) {
        this.vehiculeService=vehicule;
    }
    operate() {
        this.vehiculeService.operateVehicule();
    }
}
