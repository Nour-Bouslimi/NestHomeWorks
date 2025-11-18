import { Module } from '@nestjs/common';
import { VehiculeServiceService } from './vehicule-service.service';
import { VehiculeController } from './vehicule.controller';

@Module({
  providers: [VehiculeServiceService],
  controllers: [VehiculeController]
})
export class VehiculeModule {}
