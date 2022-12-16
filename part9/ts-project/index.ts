import express from "express";

import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_request, response) => {
  response.send("Hello Full Stack!");
});

app.get("/bmi", (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);

  if ([height, weight].includes(NaN) || [height, weight].includes(Infinity)) {
    return response.status(400).send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  return response.send({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
