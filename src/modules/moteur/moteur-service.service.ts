/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MoteurRepository } from './moteur-repository';

@Injectable()
export class MoteurServiceService {
    moteurRepository: MoteurRepository;

    constructor(moteur:MoteurRepository) {
        this.moteurRepository=moteur;

  }
    startMoteur() {
        this.moteurRepository.start();
    }
    getMoteurStatus() {
        return this.moteurRepository.getStatus();
    }
}
