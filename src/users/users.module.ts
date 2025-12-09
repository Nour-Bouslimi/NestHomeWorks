import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { Users } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController, AdminController],
  providers: [UserService],
})
export class UsersModule {}
