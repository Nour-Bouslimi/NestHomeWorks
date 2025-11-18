/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MoteurServiceService } from './moteur-service.service';

@Controller('moteur')
export class MoteurController {
    moteurService: MoteurServiceService;
    constructor(moteur:MoteurServiceService) {
        this.moteurService=moteur;
    }

    getStatus() {
        return this.moteurService.getMoteurStatus();
    }
    start() {
        this.moteurService.startMoteur();
    }
}
