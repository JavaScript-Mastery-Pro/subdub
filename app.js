import express from "express";

import { PORT } from "./config/env.js";
import connectDB from "./database/mongodb.js";

import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(arcjetMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`🚀 App listening on the port ${PORT}`);

  // Connect to MongoDB
  connectDB();
});

export default app;
