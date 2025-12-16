/* eslint-disable prettier/prettier */
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";
@Entity('messages')
export class Message {
@ObjectIdColumn()
 _id: ObjectId;
 @Column()
  id: string;
  @Column()
  content: string;
  @Column()
  status: string;
  @Column()
  date: Date;
}