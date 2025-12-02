/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Entity, ObjectIdColumn, Column, BeforeInsert, AfterInsert, AfterUpdate, BeforeRemove } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Logger } from '@nestjs/common';

@Entity('users')
export class Users {
  private static readonly logger = new Logger(Users.name);

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  active: boolean;

  // Hook : avant insertion
  @BeforeInsert()
  logInsert() {
    Users.logger.log(`BeforeInsert → Création d’un nouvel utilisateur : ${this.email}`);
  }

  // Hook : après insertion
  @AfterInsert()
  afterInsert() {
    Users.logger.log(`AfterInsert → Utilisateur créé avec ID : ${this._id}`);
  }

  // Hook : après update
  @AfterUpdate()
  afterUpdate() {
    Users.logger.log(`AfterUpdate → Utilisateur mis à jour : ${this._id}`);
  }

  // Hook : avant suppression
  @BeforeRemove()
  beforeRemove() {
    Users.logger.warn(`BeforeRemove → Suppression de l’utilisateur : ${this._id}`);
  }
}