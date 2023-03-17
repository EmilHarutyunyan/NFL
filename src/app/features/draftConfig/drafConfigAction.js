import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../../../config/config";
import { iterationRound } from "../../../utils/utils";
import {
  setFanaticIndexPosition,
  setIterationSection,
  setRoundStart,
  setTeamPickIndex,
} from "./draftConfigSlice";

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
      const res = await axios.get(
        `${API_ENDPOINT}trade-value-history/?limit=1000&offset=0&round=&round_index_number=7&tm=`
      );
      const teams = res.data.results;

      const teamSet = [];
      for (let team of teams) {
        const teamRound = team.round;
        const checkTeam = teamSet?.some((team) => team.name === teamRound.name);
        if (!checkTeam) {
          teamSet.push({ ...teamRound, selection: team.index });
        }
      }
      return teamSet;
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
  async (manualRound, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        draftConfig: { round, teamSelect,teamSelectId, fanaticChallenge },
      } = getState();
      const roundSet = manualRound || round
      const res = await axios.get(
        `${API_ENDPOINT}trade-value-history/?limit=1000&offset=0&round=&round_index_number=${roundSet}&tm=`
      );
        
      let teamPickIndex;
      if (!fanaticChallenge.length) {
        teamPickIndex = res.data.results
          .filter((team) => teamSelectId.includes(team.round.index))
          .map((team) => team.index);
          dispatch(setTeamPickIndex(teamPickIndex));
      }
      
      
      if (fanaticChallenge.length) {
        const {
          count,
          newTradeValue,
          roundStart,
          fanaticSlicesRound,
        } = iterationRound({
          fanaticChallenge,
          tradeValueData: res.data.results,
          round,
        });


        const indexPositions = newTradeValue
          .filter((team) => teamSelectId.includes(team.round.index))
          .map((item) => item["index_position"]);

        dispatch(setFanaticIndexPosition(indexPositions));
        dispatch(setRoundStart(roundStart));
        dispatch(setIterationSection(fanaticSlicesRound));
        
        teamPickIndex = newTradeValue
          .filter((team) => teamSelect[0].name === team.round.name)
          .map((team) => team["index_position"]);
  

        dispatch(setTeamPickIndex(teamPickIndex));

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
