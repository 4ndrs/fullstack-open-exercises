import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";

import type {
  Diagnosis,
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  Patient,
  OccupationalHealthcareEntry,
} from "../types";

const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams();

  // this should never happen, for now I'll just leave it here
  // don't know much about generics yet, and the one shown in 9.17 doesn't
  // really work as expected
  if (!isString(id)) {
    console.error("FIXME: Not a string", id);
    throw new Error(`Whoops, id params not a string`);
  }

  const patient = patients[id];

  useEffect(() => {
    const fetchPatientInfo = async () => {
      const url = `${apiBaseUrl}/patients/${id}`;

      try {
        const { data: updatedPatient } = await axios.get<Patient>(url);
        dispatch(updatePatient(updatedPatient));
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.error(`patient id '${id}' not found`);
        } else {
          console.error("error occurred retrieving the data");
        }
      }
    };

    if (!patient?.ssn) {
      void fetchPatientInfo();
    }
  }, [id]);

  if (!patient?.entries) {
    return <></>;
  }

  return (
    <>
      <h2>{patient.name}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <div
          key={entry.id}
          style={{
            border: "1px solid black",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <EntryDetails entry={entry} />
        </div>
      ))}
    </>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => (
  <div>
    <div>{entry.date} | Hospital</div>
    <em>{entry.description}</em>
    <ListDiagnosisCodes codes={entry.diagnosisCodes} />
    <div>diagnose by {entry.specialist}</div>
  </div>
);

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => (
  <div>
    <div>{entry.date} | Health check</div>
    <em>{entry.description}</em>
    <ListDiagnosisCodes codes={entry.diagnosisCodes} />
    <div>diagnose by {entry.specialist}</div>
  </div>
);

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => (
  <div>
    <div>
      {entry.date} | Occupational Healthcare | {entry.employerName}
    </div>
    <em>{entry.description}</em>
    <ListDiagnosisCodes codes={entry.diagnosisCodes} />
    <div>diagnose by {entry.specialist}</div>
  </div>
);

type ListDiagnosisCodesProps = { codes?: Array<Diagnosis["code"]> };

const ListDiagnosisCodes = ({ codes }: ListDiagnosisCodesProps) => {
  const [{ diagnoses }] = useStateValue();

  if (!codes || !diagnoses) {
    return null;
  }

  return (
    <ul>
      {codes.map((code) => (
        <li key={code}>
          {code} {diagnoses[code].name}
        </li>
      ))}
    </ul>
  );
};

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

const assertNever = (value: never) => {
  throw new Error(`Whoops, unhandled case ${JSON.stringify(value)}`);
};

export default PatientInfoPage;
