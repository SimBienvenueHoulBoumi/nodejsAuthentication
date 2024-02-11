import express from "express";

import dotenv from "dotenv";
dotenv.config();

import messageRouter from "./src/controllers/message.controller";
import authRouter from "./src/controllers/auth.controller";

import setupSwagger from "./src/swagger";

import { localDataSource } from "./src/app-data-source";

const app = express();

setupSwagger(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

localDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const PORT = process.env.PORT;

app.use("/message", messageRouter);
app.use("/auth", authRouter);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
