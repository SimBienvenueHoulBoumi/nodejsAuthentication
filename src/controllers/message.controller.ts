import express from "express";

import { create, getAll } from "../services/message.service";

const messageRouter = express.Router();

messageRouter.post("/create", async (req, res) => {
  const message = req.body;
  const newMessage = await create(message);
  res.status(201).send(newMessage);
});

messageRouter.get("/all", async (req, res) => {
  const messages = await getAll();
  res.status(200).send(messages);
});

export default messageRouter;
