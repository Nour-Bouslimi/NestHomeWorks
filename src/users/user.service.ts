/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { Users } from './users.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './update-user.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepo: MongoRepository<Users>,
  ) {}

  // CREATE
  async create(dto: CreateUserDto): Promise<Users> {
    const user = this.userRepo.create({
      ...dto,
      active: false,
    });

    return this.userRepo.save(user);
  }

  // FIND ALL
  findAll(): Promise<Users[]> {
    return this.userRepo.find();
  }

  // FIND ONE BY ID
  async findOneById(id: string) {
    // Validate id first to avoid "Argument passed in must be..." error
    if (!id || !ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid MongoDB id');
    }

    const objectId = new ObjectId(id);
    const user = await this.userRepo.findOne({ where: { _id: objectId } as any });

    if (!user) throw new NotFoundException('Utilisateur introuvable');

    return user;
  }
  // FIND BY EMAIL
  findOneByEmail(email: string): Promise<Users | null> {
    return this.userRepo.findOne({ where: { email } as any });
  }

  // FIND ACTIVE USERS
  findActive(): Promise<Users[]> {
    return this.userRepo.find({ where: { active: true } as any });
  }

  // UPDATE (Partial update)
  async update(id: string, dto: UpdateUserDto) {
    const user = await this.findOneById(id);
    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  // REMOVE
  async remove(id: string) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    return this.userRepo.remove(user);
  }

  // ACTIVATE ACCOUNT
  async activate(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } as any });

    if (!user) throw new NotFoundException('Utilisateur introuvable');

    if (user.password !== password) throw new BadRequestException('Mot de passe incorrect');

    user.active = true;

    return this.userRepo.save(user);
  }
}