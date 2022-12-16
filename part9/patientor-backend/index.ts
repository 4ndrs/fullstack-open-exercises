import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/api/ping", (_request, response) => {
  console.log("pin pon pin pon!");
  response.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
