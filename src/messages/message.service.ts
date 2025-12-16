/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  //  Créer un message (appelé depuis la Gateway Socket)
  async create(content: string, status: string): Promise<Message> {
    const message = this.messageRepository.create({
      content,
      status,
      date: new Date(),
    });

    return await this.messageRepository.save(message);
  }

  //  Récupérer tous les messages (optionnel mais utile)
  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({
      order: { date: 'ASC' },
    });
  }
}
