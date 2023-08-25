import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { API_ENDPOINT } from '../../../config/config';

export const getLiveTeams = createAsyncThunk(
  "liveDraft/getLiveTeams",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_ENDPOINT}team-neads/?limit=32`);
      return res.data?.results;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
