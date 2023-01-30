import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../../config/config";

export const getDraftValue = createAsyncThunk(
  "draftConfig/getDraftValue",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_ENDPOINT}trade-value/?limit=224`);
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
