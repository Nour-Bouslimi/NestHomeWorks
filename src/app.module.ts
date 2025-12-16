/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { MessagesModule } from './messages/messages.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Message } from './messages/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://127.0.0.1:27017/nestdb',
      //host: 'localhost',
      //port: 27017,
      //database: 'nestdb',
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      //database: 'nestdb',
      entities: [Users,Message],
      synchronize: true,
    }),
    UsersModule,
    MessagesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
