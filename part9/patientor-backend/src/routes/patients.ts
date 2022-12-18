import express from "express";
import patientService from "../services/patientService";
import { parseRequestBody, BodyFields } from "../patientBodyParser";

const router = express.Router();

router.get("/", (_request, response) => {
  response.send(patientService.getNonSensitiveEntries());
});

router.post("/", (request, response) => {
  try {
    const newPatient = parseRequestBody(request.body as BodyFields);
    response.status(201).send(patientService.addPatient(newPatient));
  } catch (error: unknown) {
    let errorMessage = "something happened";
    if (error instanceof Error) {
      errorMessage += ": " + error.message;
    }
    response.status(400).send({ error: errorMessage });
  }
});

export default router;
