import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("ricky");
});

app.listen(3000);
