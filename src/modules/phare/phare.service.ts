/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PhareRepository } from './phare-repository';

@Injectable()
export class PhareService {
    phareRepository: PhareRepository;
    constructor(phare:PhareRepository) {
        this.phareRepository=phare;
    }
    turnOnPhare() {
        this.phareRepository.turnOn();
    }
}
