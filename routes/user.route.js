import { Router } from "express";

const userRouter = Router();

// GET all users
userRouter.get("/", (req, res) => res.send("get all users"));

// GET user by id
userRouter.get("/:id", (req, res) => res.send("user detail"));

// POST create user
userRouter.post("/", (req, res) => res.send("create user"));

// PUT update user by id
userRouter.put("/:id", (req, res) => res.send("update user"));

// DELETE delete user by id
userRouter.delete("/:id", (req, res) => res.send("delete user"));

export default userRouter;
