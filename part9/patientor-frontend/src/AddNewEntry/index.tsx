import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import { useFormik } from "formik";
import { useState } from "react";

import { updatePatient, useStateValue } from "../state";
import entryService from "./entryService";

import type { NewEntry, Patient } from "../types";

const AddEntryModal = ({ patient }: { patient: Patient }) => {
  const [open, setOpen] = useState(false);
  const [{ diagnoses }, dispatch] = useStateValue();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: NewEntry = {
    type: "Hospital",
    date: "",
    specialist: "",
    description: "",
    diagnosisCodes: [],
    discharge: {
      date: "",
      criteria: "",
    },
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        const addedEntry = await entryService.add(patient.id, values);

        const updatedPatient = {
          ...patient,
          entries: [...patient.entries, addedEntry],
        };

        dispatch(updatePatient(updatedPatient));
        resetForm();
        setOpen(false);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Something happened: ${error.message}`);
        }
      }
    },
  });

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add new entry
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Entry</DialogTitle>
        <Divider />
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              fullWidth
              labelId="type-select-label"
              id="type"
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <MenuItem value="Hospital">Hospital</MenuItem>
            </Select>

            <TextField
              fullWidth
              label="Date"
              placeholder="YYYY-MM-DD"
              id="date"
              name="date"
              onChange={formik.handleChange}
              value={formik.values.date}
            />

            <TextField
              fullWidth
              label="Specialist"
              placeholder="Specialist"
              id="specialist"
              name="specialist"
              onChange={formik.handleChange}
              value={formik.values.specialist}
            />

            <TextField
              fullWidth
              label="Description"
              placeholder="Description"
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />

            <InputLabel id="diagnosis-codes-label" style={{ marginTop: 20 }}>
              Diagnosis codes
            </InputLabel>
            <Select
              fullWidth
              multiple
              labelId="diagnosis-codes-label"
              id="diagnosisCodes"
              name="diagnosisCodes"
              onChange={formik.handleChange}
              value={formik.values.diagnosisCodes}
            >
              {Object.values(diagnoses).map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {`${diagnosis.code} - ${diagnosis.name}`}
                </MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              id="discharge.date"
              name="discharge.date"
              onChange={formik.handleChange}
              value={formik.values.discharge.date}
            />

            <TextField
              fullWidth
              label="Discharge criteria"
              placeholder="Criteria"
              id="discharge.criteria"
              name="discharge.criteria"
              onChange={formik.handleChange}
              value={formik.values.discharge.criteria}
            />
          </DialogContent>

          <DialogActions>
            <Button
              type="button"
              color="secondary"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddEntryModal;
