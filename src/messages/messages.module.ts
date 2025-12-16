/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { ChatGateway } from './chat/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([Message]),
  ],
  providers: [MessageService, ChatGateway],
  exports: [MessageService],
})
export class MessagesModule {}
