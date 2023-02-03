import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../../config/config";
import { setTeamPickIndex } from "./draftConfigSlice";

export const getHistoryBoard = createAsyncThunk(
  "draftConfig/getHistoryBoard",
  async (_, { dispatch, rejectWithValue }) => {
    const { draft, player, round_index } = [];
    try {
      const res = await axios.post(`${API_ENDPOINT}history-board/`, {
        draft,
        player,
        round_index,
      });
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

export const getTeams = createAsyncThunk(
  "draftConfig/getTeams",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_ENDPOINT}rounds/?limit=33`);
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

export const getTradeValue = createAsyncThunk(
  "draftConfig/getTradeValue",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        draftConfig: { round, teamSelectId },
      } = getState();
      const res = await axios.get(
        `${API_ENDPOINT}trade-value-history/?limit=1000&offset=0&round=&round_index_number=${round}&tm=`
      );
      const teamPickIndex = res.data.results.filter((team) => teamSelectId.includes(team.round.index)).map(team => team.index)
      
      dispatch(setTeamPickIndex(teamPickIndex))
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
