import { Module } from '@nestjs/common';
import { GenerateurService } from './generateur.service';
import { GenerateurController } from './generateur.controller';

@Module({
  providers: [GenerateurService],
  controllers: [GenerateurController],
})
export class GenerateurModule {}
