import { Gender, HealthCheckRating } from "./types";

import type { NewEntry, NewPatient } from "./types";

export interface BodyFields {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
}

export const parseRequestBody = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: BodyFields): NewPatient => {
  if (!name || !isString(name)) {
    throw new Error(`missing or invalid name field: ${name}`);
  }

  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`missing or invalid dateOfBirth field: ${dateOfBirth}`);
  }

  if (!ssn || !isString(ssn)) {
    throw new Error(`missing or invalid ssn field: ${ssn}`);
  }

  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`missing or invalid gender field: ${gender}`);
  }

  if (!occupation || !isString(occupation)) {
    throw new Error(`missing or invalid occupation field: ${occupation}`);
  }

  const newPatient: NewPatient = {
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  return newPatient;
};

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender).includes(value as Gender);
};

export const parseEntryRequestBody = (requestBody: unknown): NewEntry => {
  assertEntry(requestBody);

  const base = {
    description: requestBody.description,
    date: requestBody.date,
    specialist: requestBody.specialist,
    diagnosisCodes: requestBody?.diagnosisCodes,
  };

  let entry: NewEntry;

  switch (requestBody.type) {
    case "Hospital":
      entry = {
        ...base,
        type: requestBody.type,
        discharge: requestBody.discharge,
      };
      break;
    case "HealthCheck":
      entry = {
        ...base,
        type: requestBody.type,
        healthCheckRating: requestBody.healthCheckRating,
      };
      break;
    case "OccupationalHealthcare":
      entry = {
        ...base,
        type: requestBody.type,
        employerName: requestBody.employerName,
        sickLeave: requestBody?.sickLeave,
      };
      break;
  }

  return entry;
};

type AssertEntry = (value: unknown) => asserts value is NewEntry;

const assertEntry: AssertEntry = (value) => {
  if (!value || typeof value !== "object") {
    throw new Error(`invalid entry`);
  }

  if (!("type" in value) || typeof value.type !== "string") {
    throw new Error("missing or invalid type property");
  }

  if (!("description" in value) || typeof value.description !== "string") {
    throw new Error("missing or invalid description property");
  }

  if (!("date" in value) || typeof value.date !== "string") {
    throw new Error("missing or invalid date property");
  }

  if (!("specialist" in value) || typeof value.specialist !== "string") {
    throw new Error("missing or invalid specialist property");
  }

  if ("diagnosisCodes" in value) {
    if (!Array.isArray(value.diagnosisCodes)) {
      throw new Error("invalid diagnosisCodes property");
    }

    if (value.diagnosisCodes.some((code) => typeof code !== "string"))
      throw new Error("invalid diagnosisCodes property");
  }

  switch (value.type) {
    case "Hospital":
      if (
        !("discharge" in value) ||
        typeof value.discharge !== "object" ||
        !value.discharge ||
        !("date" in value.discharge) ||
        !("criteria" in value.discharge) ||
        typeof value.discharge.date !== "string" ||
        typeof value.discharge.criteria !== "string"
      ) {
        throw new Error("Invalid discharge property");
      }
      break;
    case "HealthCheck":
      if (
        !("healthCheckRating" in value) ||
        typeof value.healthCheckRating !== "object" ||
        !value.healthCheckRating ||
        typeof value.healthCheckRating !== "number" ||
        !Object.values(HealthCheckRating).includes(value.healthCheckRating)
      ) {
        throw new Error("Invalid healthCheckRating property");
      }
      break;
    case "OccupationalHealthcare":
      if (
        !("employerName" in value) ||
        typeof value.employerName !== "string"
      ) {
        throw new Error("invalid employerName property");
      }

      if (
        "sickLeave" in value &&
        (typeof value.sickLeave !== "object" ||
          !value.sickLeave ||
          !("startDate" in value.sickLeave) ||
          !("endDate" in value.sickLeave) ||
          typeof value.sickLeave.startDate !== "string" ||
          typeof value.sickLeave.endDate !== "string")
      ) {
        throw new Error("invalid sickLeave property");
      }
      break;
    default:
      throw new Error("invalid type property");
  }
};
