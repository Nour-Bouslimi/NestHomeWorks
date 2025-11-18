/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MoteurServiceService } from './moteur-service.service';
import { MoteurController } from './moteur.controller';

@Module({
  providers: [MoteurServiceService],
  controllers: [MoteurController],
})
export class MoteurModule {
  
}
