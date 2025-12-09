// admin.controller.ts
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleFilterInterceptor } from './role-filter.interceptor';

@Controller('admin/users')
@UseInterceptors(RoleFilterInterceptor)
export class AdminController {
  constructor(private service: UserService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
