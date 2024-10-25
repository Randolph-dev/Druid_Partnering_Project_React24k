import { createSlice } from "@reduxjs/toolkit"


export interface DrupalState {
  value: number
}

const initialState: DrupalState = {
  value: 0,
}

export const drupalSlice = createSlice({
  name: 'drupal',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = drupalSlice.actions;

export default drupalSlice.reducer;