import { Router } from "express";

import { signin, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

// POST sign up
authRouter.post("/signup", signup);

// POST sign in
authRouter.post("/signin", signin);

// POST sign out
authRouter.post("/signout", (req, res) => res.send("signout"));

export default authRouter;
