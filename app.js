import express from "express";

import { PORT } from "./config/env.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(arcjetMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

export default app;
