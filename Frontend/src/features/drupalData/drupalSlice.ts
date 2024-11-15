import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import fetchJsonApiLinksFromDrupal, { JsonApiLinks } from "../../lib/drupal/drupal-api";
import { Paragraph } from "../../types/drupal";


export interface DrupalState {
  isLoading: boolean,
  jsonApiLinks: JsonApiLinks,
  pageData: Record<string, Paragraph[]>,
}

const initialState: DrupalState = {
  isLoading: true,
  jsonApiLinks: {} as JsonApiLinks,
  pageData: {},
}

export const drupalSlice = createSlice({
  name: 'drupal',
  initialState,
  reducers: {
    // just a place holder reducer, doesn't actually do anything
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPageData: (state, action: PayloadAction<{ page: string, data: Paragraph[] }>) => {
      const { page, data } = action.payload;
      state.pageData[page] = data;
    }
  },
  // this extra reducer call the api function to get api links and store it in state
  extraReducers: (builder) => {
    builder.addCase(
      fetchJsonApiLinksFromDrupal.fulfilled,
      (state, action: PayloadAction<JsonApiLinks>) => {
        state.jsonApiLinks = action.payload;
      },
    );
  },
});

export const { setLoading, setPageData } = drupalSlice.actions;

export default drupalSlice.reducer;