import { NewPatient } from "./types";

export interface BodyFields {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
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

  if (!gender || !isString(gender)) {
    throw new Error(`missing or invalid gender field: ${gender}`);
  }

  if (!occupation || !isString(occupation)) {
    throw new Error(`missing or invalid occupation field: ${occupation}`);
  }

  const newPatient = { name, dateOfBirth, ssn, gender, occupation };

  return newPatient;
};

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

const isDate = (value: string): boolean => {
  return Boolean(Date.parse(value));
};
