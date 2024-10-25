import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// TODO: write function to fetch articles, pages, cases, etc. from the links provided by this function

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
    console.log(links);
    return links;
  },
)

export default fetchJsonApiLinksFromDrupal;
