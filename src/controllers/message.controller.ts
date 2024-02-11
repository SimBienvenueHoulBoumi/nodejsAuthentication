import express from "express";
import { create, getAll } from "../services/message.service";

const messageRouter = express.Router();

/**
 * @openapi
 * /message/create:
 *   post:
 *     tags:
 *       - message
 *     summary: add message
 *     description: Creates a new message in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Content of the message
 *     responses:
 *       201:
 *         description: Message created successfully
 *       500:
 *         description: Internal Server Error
 */
messageRouter.post("/create", async (req, res) => {
  const message = req.body;
  try {
    const newMessage = await create(message);
    res.status(201).send(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /message/all:
 *   get:
 *     tags:
 *       - message
 *     summary: display all messages
 *     description: Retrieves all messages stored in the database.
 *     responses:
 *       200:
 *         description: Request successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Message ID
 *                   description:
 *                     type: string
 *                     description: Content of the message
 *       500:
 *         description: Internal Server Error
 */
messageRouter.get("/all", async (req, res) => {
  try {
    const messages = await getAll();
    res.status(200).send(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default messageRouter;
