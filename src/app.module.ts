/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoteurModule } from './modules/moteur/moteur.module';
import { GenerateurModule } from './modules/generateur/generateur.module';
import { PhareModule } from './modules/phare/phare.module';
import { AudioModule } from './modules/audio/audio.module';
import { VehiculeModule } from './modules/vehicule/vehicule.module';
import { MoteurServiceService } from './modules/moteur/moteur-service.service';
import { GenerateurService } from './modules/generateur/generateur.service';
import { PhareService } from './modules/phare/phare.service';
import { AudioService } from './modules/audio/audio.service';
import { VehiculeServiceService } from './modules/vehicule/vehicule-service.service';

@Module({
  imports: [MoteurModule, GenerateurModule, PhareModule, AudioModule, VehiculeModule],
  controllers: [AppController],
  providers: [AppService,MoteurServiceService, GenerateurService, PhareService, AudioService, VehiculeServiceService],
})
export class AppModule {}
