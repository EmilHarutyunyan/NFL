import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../../config/config";

const initialState = {
  teamNeeds:[],

  loading: false
};


export const getTeamNeeds = createAsyncThunk(
  "teamNeeds/getTeamNeeds",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_ENDPOINT}team-neads/?limit=32`);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const setHistoryBoard = createAsyncThunk(
  "teamNeeds/setHistoryBoard",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_ENDPOINT}history-board/`,data);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const teamNeedsSlice = createSlice({
  name:"teamNeeds",
  initialState,
  reducers: {

  },
  extraReducers: {
    [getTeamNeeds.fulfilled]: (state, action) => {
      state.loading = false;
      state.teamNeeds = action.payload?.results;
    },
    [getTeamNeeds.pending]: (state, action) => {
      state.loading = true;
    },
    [getTeamNeeds.rejected]: (state, action) => {
      state.loading = false;
    },
    [setHistoryBoard.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload.results);
    },
    [setHistoryBoard.pending]: (state, action) => {
      state.loading = true;
    },
    [setHistoryBoard.rejected]: (state, action) => {
      state.loading = false;
    },
  }
})

export const selectTeamNeeds = (state) => state.teamNeeds;

export default teamNeedsSlice.reducer;