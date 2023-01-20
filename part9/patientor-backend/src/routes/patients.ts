import express from "express";
import patientService from "../services/patientService";
import {
  parseRequestBody,
  BodyFields,
  parseEntryRequestBody,
} from "../patientBodyParser";

const router = express.Router();

router.get("/", (_request, response) => {
  response.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (request, response) => {
  try {
    const patient = patientService.findPatient(request.params.id);
    response.send(patient);
  } catch (_error) {
    response.sendStatus(404);
  }
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

router.post("/:id/entries", (request, response) => {
  try {
    const newEntry = parseEntryRequestBody(request.body as unknown);

    response
      .status(201)
      .send(patientService.addEntry(request.params.id, newEntry));
  } catch (error: unknown) {
    let errorMessage = "something happened";
    if (error instanceof Error) {
      errorMessage += ": " + error.message;
    }
    response.status(400).send({ error: errorMessage });
  }
});
export default router;
