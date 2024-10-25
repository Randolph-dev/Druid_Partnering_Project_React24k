import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import fetchJsonApiLinksFromDrupal, { JsonApiLinks } from "../../lib/drupal/drupal-api";


export interface DrupalState {
  value: number,
  jsonApiLinks: JsonApiLinks,
}

const initialState: DrupalState = {
  value: 0,
  jsonApiLinks: {} as JsonApiLinks
}

export const drupalSlice = createSlice({
  name: 'drupal',
  initialState,
  reducers: {
    // just a place holder reducer, doesn't actually do anything
    increment: (state) => {
      state.value += 1;
    },
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

export const { increment } = drupalSlice.actions;

export default drupalSlice.reducer;