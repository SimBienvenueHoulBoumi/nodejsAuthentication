import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  description!: string;
}
