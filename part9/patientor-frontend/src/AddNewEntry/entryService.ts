import axios from "axios";
import { apiBaseUrl } from "../constants";

import type { Entry, NewEntry } from "../types";

const add = async (id: string, data: NewEntry) => {
  const endpoint = `${apiBaseUrl}/patients/${id}/entries`;
  const addedEntry = (await axios.post<Entry>(endpoint, data)).data;

  return addedEntry;
};

export default { add };
