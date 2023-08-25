import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading: false,
  error: null,
  message: '',
  pageEvent: "list"
}

const draftEventsSlice = createSlice({
  name: "draftEvents",
  initialState,
  reducers: {
    showPage: (state,{payload}) => {
      state.pageEvent = payload;
    },
  },
  extraReducers: {},
});

export const { showPage } = draftEventsSlice.actions;

export const selectDraftEvents = (state) => state.draftEvents;

export default draftEventsSlice.reducer
