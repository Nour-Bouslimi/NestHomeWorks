/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { VehiculeRepository } from './vehicule-repository';

@Injectable()
export class VehiculeServiceService {
    vehiculeRepository: VehiculeRepository;

    constructor(vehiculeRepository: VehiculeRepository) {
        this.vehiculeRepository = vehiculeRepository;
    }
    operateVehicule() {
        this.vehiculeRepository.operate();
    }
}
