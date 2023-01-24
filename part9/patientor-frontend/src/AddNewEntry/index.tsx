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

import type { NewEntry, Patient, Errors } from "../types";

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
    validate: (values) => {
      const errors: Errors = {};
      const required = "Required";
      const dateFormat = "Must be in YYYY-MM-DD format";

      const dateRegex =
        /^\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1]\d|[2]\d|[3][0-1])$/;

      if (!values.date) {
        errors.date = required;
      } else if (!values.date.match(dateRegex)) {
        errors.date = dateFormat;
      }

      if (!values.specialist) {
        errors.specialist = required;
      }

      if (!values.description) {
        errors.description = required;
      }

      switch (values.type) {
        case "Hospital":
          if (!values.discharge.date) {
            errors.discharge = { ...errors.discharge, date: required };
          } else if (!values.discharge.date.match(dateRegex)) {
            errors.discharge = { ...errors.discharge, date: dateFormat };
          }

          if (!values.discharge.criteria) {
            errors.discharge = { ...errors.discharge, criteria: required };
          }

          break;
      }

      return errors;
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
              onBlur={formik.handleBlur}
              value={formik.values.date}
              helperText={formik.touched.date && formik.errors.date}
              error={Boolean(formik.touched.date && formik.errors.date)}
            />

            <TextField
              fullWidth
              label="Specialist"
              placeholder="Specialist"
              id="specialist"
              name="specialist"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.specialist}
              helperText={formik.touched.specialist && formik.errors.specialist}
              error={Boolean(
                formik.touched.specialist && formik.errors.specialist
              )}
            />

            <TextField
              fullWidth
              label="Description"
              placeholder="Description"
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              helperText={
                formik.touched.description && formik.errors.description
              }
              error={Boolean(
                formik.touched.description && formik.errors.description
              )}
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
              onBlur={formik.handleBlur}
              value={formik.values.discharge.date}
              helperText={
                formik.touched.discharge?.date && formik.errors.discharge?.date
              }
              error={Boolean(
                formik.touched.discharge?.date && formik.errors.discharge?.date
              )}
            />

            <TextField
              fullWidth
              label="Discharge criteria"
              placeholder="Criteria"
              id="discharge.criteria"
              name="discharge.criteria"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.discharge.criteria}
              helperText={
                formik.touched.discharge?.criteria &&
                formik.errors.discharge?.criteria
              }
              error={Boolean(
                formik.touched.discharge?.criteria &&
                  formik.errors.discharge?.criteria
              )}
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
