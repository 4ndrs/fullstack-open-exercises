import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_request, response) => {
  response.send("Hello Full Stack!");
});

app.get("/bmi", (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);

  if ([height, weight].includes(NaN) || [height, weight].includes(Infinity)) {
    return response.status(400).send({ error: "malformatted parameters" });
  }

  try {
    const bmi = calculateBmi(height, weight);
    return response.send({ weight, height, bmi });
  } catch (error: unknown) {
    let errorMessage = "malformatted parameters";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return response.status(400).send({ error: errorMessage });
  }
});

interface ExercisesRequestBody {
  daily_exercises: unknown;
  target: unknown;
}

interface ExercisesRequest {
  body: ExercisesRequestBody;
}

app.post("/exercises", (request: ExercisesRequest, response) => {
  const missingParamsMessage = { error: "parameters missing" };
  const malformattedParamsMessage = { error: "malformatted parameters" };

  if ([request.body.daily_exercises, request.body.target].includes(undefined)) {
    return response.status(400).send(missingParamsMessage);
  }

  if (!(request.body.daily_exercises instanceof Array)) {
    return response.status(400).send(malformattedParamsMessage);
  }

  const target = Number(request.body.target);
  const dailyExerciseHours = request.body.daily_exercises.map((hour) =>
    Number(hour)
  );

  if (
    [...dailyExerciseHours, target].includes(NaN) ||
    [...dailyExerciseHours, target].includes(Infinity)
  ) {
    return response.status(400).send(malformattedParamsMessage);
  }

  try {
    const result = calculateExercises(dailyExerciseHours, target);
    return response.send(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
    }
    return response.status(400).send(malformattedParamsMessage);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
