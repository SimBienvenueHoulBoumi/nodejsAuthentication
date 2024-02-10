import { DataSource } from "typeorm";
import { Message } from "./models/message.entity";

export const localDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "nodejs-authentication",
  entities: [Message],
  logging: false,
  synchronize: true,
});
