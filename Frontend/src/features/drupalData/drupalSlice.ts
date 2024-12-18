import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import fetchJsonApiLinksFromDrupal, { JsonApiLinks } from "../../lib/drupal/drupal-api";
import { Paragraph, RestResponseData } from "../../types/drupal";


export interface DrupalState {
  isLoading: boolean,
  jsonApiLinks: JsonApiLinks,
  homepagesData: RestResponseData[],
  currentHomepageData: Record<string, Paragraph[]>,
  userType: string,
  pageData: Record<string, Paragraph[]>,
  projectsData: RestResponseData[],
}

const initialState: DrupalState = {
  isLoading: true,
  jsonApiLinks: {} as JsonApiLinks,
  homepagesData: [],
  currentHomepageData: {},
  userType: '',
  pageData: {},
  projectsData: [],
}

export const drupalSlice = createSlice({
  name: 'drupal',
  initialState,
  reducers: {
    // just a place holder reducer, doesn't actually do anything
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHomepagesData: (state, action: PayloadAction<RestResponseData[]>) => {
      state.homepagesData = action.payload;
    },
    setCurrentHomepageData: (state, action: PayloadAction<{ page: string, data: Paragraph[] }>) => {
      const { page, data } = action.payload;
      state.currentHomepageData[page] = data;
    },
    setUserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
    },
    setPageData: (state, action: PayloadAction<{ page: string, data: Paragraph[] }>) => {
      const { page, data } = action.payload;
      state.pageData[page] = data;
    },
    setProjectsData: (state, action: PayloadAction<RestResponseData[]>) => {
      state.projectsData = action.payload;
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

export const { setLoading, setHomepagesData, setCurrentHomepageData, setUserType, setPageData, setProjectsData } = drupalSlice.actions;

export default drupalSlice.reducer;