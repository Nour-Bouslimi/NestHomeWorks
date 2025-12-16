/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
WebSocketGateway,
SubscribeMessage,
MessageBody,
WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from '../message.service';

@WebSocketGateway()
export class ChatGateway {
@WebSocketServer()
server: Server;
constructor(private readonly messagesService: MessageService) {}
@SubscribeMessage('send_message')
async handleMessage(@MessageBody() data: any) {
 // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
 const message = await this.messagesService.create(data.content,
'sent');
this.server.emit('receive_message', message);
return message;
}
}