import express from "express";

import { PORT } from "./config/env.js";
import connectDB from "./database/mongodb.js";

import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscription.route.js";

const app = express();

app.use(arcjetMiddleware);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`🚀 App listening on the port ${PORT}`);

  // Connect to MongoDB
  connectDB();
});

export default app;
