import { Router } from "express";

const authRouter = Router();

// POST sign up
authRouter.post("/signup", (req, res) => res.send("sign up"));

// POST sign in
authRouter.post("/signin", (req, res) => res.send("signin"));

// POST sign out
authRouter.post("/signout", (req, res) => res.send("signout"));

export default authRouter;
