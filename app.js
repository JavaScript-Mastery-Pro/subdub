import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5500, () => {
  console.log("Example app listening on port 5500!");
});

export default app;
