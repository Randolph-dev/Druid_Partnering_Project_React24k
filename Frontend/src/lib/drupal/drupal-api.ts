import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// This default URL should return everything exported by the JSON API
const drupalUrl: string = import.meta.env.VITE_DRUPAL_URL;

export interface JsonApiLink {
  href: string;
}

export interface JsonApiLinks {
  [key: string]: JsonApiLink;
}

const fetchJsonApiLinksFromDrupal = createAsyncThunk(
  'drupal/fetchJsonApiLinksFromDrupal',
  async (): Promise<JsonApiLinks> => {
    const { data: { links } } = await axios.get<{ links: JsonApiLinks }>(drupalUrl);
    return links;
  },
)

export default fetchJsonApiLinksFromDrupal;
