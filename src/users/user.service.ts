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
    private userRepo: MongoRepository<Users>
  ) {}

  // CREATE
async create(dto: { email: string; role: 'admin' | 'client' }) {
  const exists = await this.userRepo.findOne({ where: { email: dto.email } });
  if (exists) throw new Error('Email déjà utilisé');

  const user = this.userRepo.create({
    email: dto.email,
    role: dto.role,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return this.userRepo.save(user);
}

  // FIND ALL
 /* findAll(): Promise<Users[]> {
    return this.userRepo.find();
  }*/

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
 async update(id: string, dto: Partial<Users>) {
    dto.updatedAt = new Date();
    await this.userRepo.update(id, dto);
    return this.userRepo.findOne({ where: { id: new ObjectId(id) } });
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

  // tp s13
   async findAll() {
    return this.userRepo.find();
  }

 // Utilisateurs non mis à jour depuis 6 mois
  async outdatedUsers() {
    const limit = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
    return this.userRepo.find({ where: { updatedAt: { $lt: limit } } });
  }

 // Email appartenant a un domaine spécifique
  async findByDomain(domain: string) {
    return this.userRepo.find({
      where: { email: { $regex: `${domain}$` } },
    });
  }

//users Créés durant les 7 derniers jours
  async createdLastWeek() {
    const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return this.userRepo.find({
      where: { createdAt: { $gt: date } },
    });
  }

 // Nombre d'utilisateurs par rôle
  async countByRole() {
    return this.userRepo.aggregate([
      { $group: { _id: '$role', total: { $sum: 1 } } },
    ]).toArray();
  }


 // Créés entre deux dates
  async createdBetween(start: Date, end: Date) {
    return this.userRepo.find({
      where: {
        createdAt: { $gte: start, $lte: end },
      },
    });
  }

  // Utilisateurs les plus récents
  async latestUsers(limit = 5) {
    return this.userRepo.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

// Moyenne du nombre de jours entre création & mise à jour
  async avgUpdateDelay() {
    return this.userRepo.aggregate([
      {
        $project: {
          days: {
            $divide: [
              { $subtract: ['$updatedAt', '$createdAt'] },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
      { $group: { _id: null, avgDays: { $avg: '$days' } } },
    ]).toArray();
  }
 // ---------------- Pagination & Tri ----------------

  async paginated(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.userRepo.find({ skip, take: limit });
  }

  async sortByCreated(desc = true) {
    return this.userRepo.find({
      order: { createdAt: desc ? 'DESC' : 'ASC' },
    });
  }

async multiSort() {
    return this.userRepo.find({
      order: { role: 'ASC', createdAt: 'DESC' },
    });
  }

  // Désactiver les comptes inactifs > 1 an
  async disableInactive() {
    const oneYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

    return this.userRepo.updateMany(
      { updatedAt: { $lt: oneYear } },
      { $set: { role: 'disabled' } },
    );
  } 
 // Mise à jour massive d'un rôle selon domaine email
  async updateRoleByDomain(domain: string, newRole: string) {
    return this.userRepo.updateMany(
      { email: { $regex: `${domain}$` } },
      { $set: { role: newRole, updatedAt: new Date() } },
    );
  }






}