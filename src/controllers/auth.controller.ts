import express from "express";
import {
  create,
  updatePassword,
  findByUsernameAndPassword,
  deleteUser
} from "../services/user.service";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findByUsernameAndPassword(username, password);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).send("Internal Server Error");
  }
});

authRouter.post("/register", async (req, res) => {
  const user = req.body;
  try {
    await create(user);
    res.status(201).send("register successfully");
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});

authRouter.patch("/updatePassword/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const updatedUser = await updatePassword(password, id);
    if (updatedUser) {
      res.status(200).send("User updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error while updating password:", error);
    res.status(500).send("Internal Server Error");
  }
});

authRouter.delete("/deleteUser/:id", async (req, res) => {
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
