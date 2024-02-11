import express from "express";
import {
  create,
  getAll,
  findOne,
  updateOne,
  deleteOne,
} from "../services/message.service";
import authMiddleware from "../middleware/auth.middleware";

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
messageRouter.post("/create", authMiddleware, async (req, res) => {
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
messageRouter.get("/all", authMiddleware, async (req, res) => {
  try {
    const messages = await getAll();
    res.status(200).send(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /message/{id}:
 *   get:
 *     tags:
 *       - message
 *     summary: display message by ID
 *     description: Retrieves a message by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Request successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Message ID
 *                 description:
 *                   type: string
 *                   description: Content of the message
 *       500:
 *         description: Internal Server Error
 */
messageRouter.get("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const message = await findOne(id);
    res.status(200).send(message);
  } catch (error) {
    console.error("Error getting message:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /message/update/{id}:
 *   patch:
 *     tags:
 *       - message
 *     summary: update message by ID
 *     description: Updates a message by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
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
 *       200:
 *         description: Message updated successfully
 *       500:
 *         description: Internal Server Error
 */
messageRouter.patch("/update/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const message = req.body;
  try {
    const updatedMessage = await updateOne(id, message);
    res.status(200).send(updatedMessage);
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /message/delete/{id}:
 *   delete:
 *     tags:
 *       - message
 *     summary: delete message by ID
 *     description: Deletes a message by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       500:
 *         description: Internal Server Error
 */
messageRouter.delete("/delete/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const deletedMessage = await deleteOne(id);
    res.status(200).send(deletedMessage);
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default messageRouter;
