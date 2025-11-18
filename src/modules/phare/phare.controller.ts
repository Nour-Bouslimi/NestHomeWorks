/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { PhareService } from './phare.service';

@Controller('phare')
export class PhareController {
    phareService: PhareService;
    constructor(phare:PhareService) {
        this.phareService=phare;
    }
    turnOn() {
        this.phareService.turnOnPhare();
    }
}
