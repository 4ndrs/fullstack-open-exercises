import { v1 as uuid } from "uuid";
import patients from "../../data/patients";

import type {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";

const getNonSensitiveEntries = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = { id: uuid(), ...newPatient, entries: [] };

  patients.push(patient);
  return patient;
};

const addEntry = (id: string, newEntry: NewEntry) => {
  const patient = patients.find((patient) => patient.id === id);

  if (!patient) {
    throw new Error(`patient not found: ${id}`);
  }

  const entry: Entry = { id: uuid(), ...newEntry };

  patient.entries.push(entry);

  return entry;
};

const findPatient = (id: string): Patient => {
  const patient = patients.find((patient) => patient.id === id);

  if (!patient) {
    throw new Error(`patient not found: ${id}`);
  }

  return patient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  addEntry,
  findPatient,
};
