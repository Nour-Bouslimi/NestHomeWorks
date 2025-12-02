/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,

} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './update-user.dto';

@Controller('users')
export class UsersController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

@Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

@Put('/activate')
  activate(@Body() body: { email: string; password: string }) {
    return this.userService.activate(body.email, body.password);
  }
  @Get('/active')
  getActive() {
    return this.userService.findActive();
  }
 @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

@Get('email/:email')
  getByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

 @Get()
  getAll() {
    return this.userService.findAll();
  }

  
 @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }


  /* séance 2
  private users = [
    {
      id: 1,
      username: 'Mohamed',
      email: 'mohamed@esprit.tn',
      status: 'active',
    },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
  ];

  @Get()
  getAllUsers(@Query('status') status?: string) {
    let result = this.users;

    if (status) {
      const statusLower = status.toLowerCase();
      result = result.filter((u) => u.status.toLowerCase() === statusLower);
    }

    return result;
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.users.find((u) => u.id === id);
  }
  @Post()
  createUser(@Body() body: any, @Headers('authorization') auth?: string) {
    const newUser = {
      id: this.users.length + 1,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      username: body.username,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      email: body.email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      status: body.status || 'active',
    };
    this.users.push(newUser);
    return {
      message: 'Utilisateur ajouté avec succès',
      user: newUser,
      headerAuth: auth || 'Aucun header Authorization reçu',
    };
  }
  //post with dto
  @Post()
  create(
    @Body() newUser: CreateUserDto,
    @Headers('Authorization') auth: string,
  ) {
    console.log('Auth header:', auth);
    const id = this.users.length + 1;
    const user = { id, ...newUser, status: 'active' };
    this.users.push(user);
    return user;
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() body: any) {
    const index = this.users.findIndex((u) => u.id == id);
    if (index === -1) {
      return { message: 'Utilisateur introuvable' };
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.users[index] = { ...this.users[index], ...body };
    return { message: 'Utilisateur mis à jour', user: this.users[index] };
  }
  //put with dto
  @Put(':id')
  update(@Param('id') id: number, @Body() updatedUser: CreateUserDto) {
    const index = this.users.findIndex((u) => u.id == id);
    if (index === -1) return { message: 'Utilisateur introuvable' };
    this.users[index] = { ...this.users[index], ...updatedUser };
    return { message: 'Utilisateur mis à jour', user: this.users[index] };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    const index = this.users.findIndex((u) => u.id == id);
    if (index === -1) {
      return { message: 'Utilisateur introuvable' };
    }
    const deletedUser = this.users.splice(index, 1);
    return { message: 'Utilisateur supprimé', user: deletedUser[0] };
  }
  @Get('active/:status')
  getUsersActive(@Param('status') status: string) {
    return this.users.filter((u) => u.status === status);
  }*/
}
