import express from "express";

const app = express();

app.get("/api/ping", (_request, response) => {
  console.log("pin pon pin pon!");
  response.send("pong");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
