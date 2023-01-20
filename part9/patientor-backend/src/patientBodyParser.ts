import { Entry, Gender, HealthCheckRating, NewPatient } from "./types";

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

export const parseEntryRequestBody = (requestBody: unknown): Entry => {
  if (!isEntry(requestBody)) {
    throw new Error("invalid entry");
  }

  const base = {
    id: requestBody.id,
    description: requestBody.description,
    date: requestBody.date,
    specialist: requestBody.specialist,
    diagnosisCodes: requestBody?.diagnosisCodes,
  };

  let entry: Entry;

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

const isEntry = (value: unknown): value is Entry => {
  // check type prop
  if (
    !value ||
    typeof value !== "object" ||
    !("type" in value) ||
    typeof value.type !== "string"
  ) {
    return false;
  }

  // check baseEntry props
  if (
    !("id" in value) ||
    !("description" in value) ||
    !("date" in value) ||
    !("specialist" in value) ||
    typeof value.id !== "string" ||
    typeof value.description !== "string" ||
    typeof value.date !== "string" ||
    typeof value.specialist !== "string"
  ) {
    return false;
  }

  if ("diagnosisCodes" in value) {
    if (!Array.isArray(value.diagnosisCodes)) {
      return false;
    }

    if (value.diagnosisCodes.some((code) => typeof code !== "string"))
      return false;
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
        return false;
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
        return false;
      }
      break;
    case "OccupationalHealthcare":
      if (
        !("employerName" in value) ||
        typeof value.employerName !== "string"
      ) {
        return false;
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
        return false;
      }
      break;
    default:
      return false;
  }
  return true;
};
