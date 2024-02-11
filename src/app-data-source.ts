import { DataSource } from "typeorm";
import { Message } from "./models/message.entity";
import { User } from "./models/user.entity";

export const localDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "nodejs-authentication",
  entities: [Message, User],
  logging: false,
  synchronize: true,
});
