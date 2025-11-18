/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { GenerateurRepository } from './generateur-repository';

@Injectable()
export class GenerateurService {
    generateurRepository: GenerateurRepository;
    constructor(gen:GenerateurRepository) {
        // eslint-disable-next-line prettier/prettier
        this.generateurRepository=gen;
    }
    generatePower() {
        this.generateurRepository.generatePower();
    }
}
