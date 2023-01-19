import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Patient } from "../types";

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
        <div key={entry.id}>
          <p>
            {entry.date} {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}
          </ul>
        </div>
      ))}
    </>
  );
};

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export default PatientInfoPage;
