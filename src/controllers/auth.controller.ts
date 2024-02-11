import express from "express";
import jwt from "jsonwebtoken";
import {
  create,
  updatePassword,
  findByUsernameAndPassword,
  deleteUser,
} from "../services/user.service";
import authMiddleware from "../middleware/auth.middleware";

import dotenv from "dotenv";
dotenv.config();

const authRouter = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - authentication
 *     summary: User login
 *     description: Authenticate user with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findByUsernameAndPassword(username, password);
    if (user) {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret is not defined");
      }

      // Generate JWT token
      const token = jwt.sign(
        { username: user.username, id: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({ token, user });
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - authentication
 *     summary: Register new user
 *     description: Register a new user with username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Internal Server Error
 */
authRouter.post("/register", async (req, res) => {
  const user = req.body;
  try {
    await create(user);
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @openapi
 * /auth/updatePassword/{id}:
 *   patch:
 *     tags:
 *       - authentication
 *     summary: Update user password
 *     description: Update user password by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
authRouter.patch("/updatePassword/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const updatedUser = await updatePassword(password, id);
    if (updatedUser) {
      res.status(200).send("Password updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error while updating password:", error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @openapi
 * /auth/deleteUser/{id}:
 *   delete:
 *     tags:
 *       - authentication
 *     summary: Delete user
 *     description: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
authRouter.delete("/deleteUser/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUser(id);
    if (deletedUser) {
      res.status(200).send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error while deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default authRouter;
