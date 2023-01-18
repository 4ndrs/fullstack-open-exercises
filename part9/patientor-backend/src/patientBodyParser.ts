import { Entry, Gender, NewPatient } from "./types";

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
  entries,
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

  if (!entries || !isEntries(entries)) {
    throw new Error(`missing or invalid entries field: ${entries}`);
  }

  const newPatient = { name, dateOfBirth, ssn, gender, occupation, entries };

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

const isEntries = (value: unknown): value is Array<Entry> => {
  if (!Array.isArray(value)) {
    return false;
  }

  if (value.some(isNotEntry)) {
    return false;
  }

  return true;
};

const isNotEntry = (entry: Entry) =>
  !["Hospital", "OccupatinalHealthCare", "HealthCheck"].includes(entry.type);
