/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { GenerateurService } from './generateur.service';

@Controller('generateur')
export class GenerateurController {
    generateurService: GenerateurService;
    constructor(gen:GenerateurService) {
        this.generateurService=gen;
    }
    generatePower() {
        this.generateurService.generatePower();
    }
}
