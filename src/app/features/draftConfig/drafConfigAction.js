import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../../config/config";
import { iterationRound } from "../../../utils/utils";
import { setFanaticIndexPosition, setRoundStart, setTeamPickIndex } from "./draftConfigSlice";

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
        draftConfig: { round, teamSelectId, fanaticChallenge },
      } = getState();
      const res = await axios.get(
        `${API_ENDPOINT}trade-value-history/?limit=1000&offset=0&round=&round_index_number=${round}&tm=`
      );
      
      const teamPickIndex = res.data.results.filter((team) => teamSelectId.includes(team.round.index)).map(team => team.index)
  
      dispatch(setTeamPickIndex(teamPickIndex))
      
      if (fanaticChallenge.length) {
        
        const { count, newTradeValue, roundStart, } = iterationRound({
          fanaticChallenge,
          tradeValueData: res.data.results,
          round
        });
        console.log('newTradeValue :', newTradeValue);
        const indexPositions = newTradeValue
          .filter((team) => teamSelectId.includes(team.round.index))
          .map((item) => item["index_position"]  );
    
        dispatch(setFanaticIndexPosition(indexPositions));
        dispatch(setRoundStart(roundStart))
        return { ...res.data, count, results: newTradeValue };

      } else {
        return res.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
