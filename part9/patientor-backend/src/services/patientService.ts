import { v1 as uuid } from "uuid";
import patients from "../../data/patients";

import { NewPatient, NonSensitivePatient, Patient } from "../types";

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
  const patient = { id: uuid(), ...newPatient };

  patients.push(patient);
  return patient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
};
