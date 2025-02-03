import { Router } from "express";

import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

// GET all users
userRouter.get("/", getUsers);

// GET user by id
userRouter.get("/:id", authorize, getUser);

// POST create user
userRouter.post("/", (req, res) => res.send("create user"));

// PUT update user by id
userRouter.put("/:id", (req, res) => res.send("update user"));

// DELETE delete user by id
userRouter.delete("/:id", (req, res) => res.send("delete user"));

export default userRouter;
