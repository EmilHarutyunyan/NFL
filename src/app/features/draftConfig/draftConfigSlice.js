import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../../config/config";
import { toggleArrObj } from "../../../utils/utils";

const initialState = {
  teams: [],
  teamSelect: [],
  teamSelectId: [],
  round: "1",
  possitionalNedd: false,
  bpaCalculated: "",
  userQuantity: 3,
  loading: false,
  positionPlayer: [],
  draftPlayers: [
    {
      id: 1,
      rank: "35",
      adp: "42.1",
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: "QB",
      collegeName: "Ohio State",
      collegeImg: "",
    },
    {
      id: 1,
      rank: "35",
      adp: "42.1",
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: "QB",
      collegeName: "Ohio State",
      collegeImg: "",
    },
    {
      id: 1,
      rank: "35",
      adp: "42.1",
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: "QB",
      collegeName: "Ohio State",
      collegeImg: "",
    },
    {
      id: 1,
      rank: "35",
      adp: "42.1",
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: "QB",
      collegeName: "Ohio State",
      collegeImg: "",
    },
    {
      id: 1,
      rank: "35",
      adp: "42.1",
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: "QB",
      collegeName: "Ohio State",
      collegeImg: "",
    },
    {
      id: 1,
      rank: "35",
      adp: "42.1",
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: "QB",
      collegeName: "Ohio State",
      collegeImg: "",
    },
    {
      id: 1,
      rank: "35",
      adp: "42.1",
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: "QB",
      collegeName: "Ohio State",
      collegeImg: "",
    },
  ],
  satus: "",
  pauseId: [],
  countRender: 0,
};

export const getTeams = createAsyncThunk(
  "draftConfig/getTeams",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_ENDPOINT}rounds/?limit=32`);
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

export const draftConfigSlice = createSlice({
  name: "draftConfig",
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teamSelect = action.payload;
      state.status = state.teamSelect.length > 0 ? "green" : "";
    },
    setCountRender: (state, action) => {
      state.countRender = action.payload;
    },
    setAllTeams: (state, action) => {
      state.teamSelect = action.payload ? state.teams : [];
    },
    setRound: (state, action) => {
      state.round = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setPositionPlayer: (state, action) => {
      state.positionPlayer = toggleArrObj(
        state.positionPlayer,
        action.payload,
        (item) => item
      );
    },
    setTeamsRound: (state, action) => {
      const teamSelectSort = action.payload.sort(function(a, b){return a - b});
      state.teamSelectId = teamSelectSort
    },
    setPauseId: (state,action) => {
      state.pauseId = [action.payload]
      const teamSelectSort= [...state.teamSelectId,action.payload].sort(function(a, b){return a - b})
      state.teamSelectId = teamSelectSort
    },
    setResetRound: (state,_) => {
      state.teamSelectId = []
      state.teamSelect = []
      state.round = "1"
      state.countRender = 0
      state.positionPlayer = []
      state.pauseId = []
    },
    delPauseId: (state,_) => {
      state.teamSelectId = state.teamSelectId.filter(id => id !== state.pauseId[0])
      state.pauseId = []
    },
    delTeamsRound: (state, action) => {
      state.teamSelectId = state.teamSelectId.filter(
        (item) => action.payload !== item
      );
    },
  },
  extraReducers: {
    [getTeams.fulfilled]: (state, action) => {
      state.loading = false;
      state.teams = action.payload?.results;
    },
    [getTeams.pending]: (state, action) => {
      state.loading = true;
    },
    [getTeams.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const selectDraftConfig = (state) => state.draftCongif;

export const {
  setTeams,
  setAllTeams,
  setRound,
  setPositionPlayer,
  setTeamsRound,
  setCountRender,
  setStatus,
  setPauseId,
  delTeamsRound,
  setResetRound,
  delPauseId
} = draftConfigSlice.actions;

const teamRound = (round, teamSelectId) => {
  const roundsTeam = [];
  for (let value of teamSelectId) {
    for (let i = 1; i < +round; i++) {
      roundsTeam.push(value + i * 32);
    }
  }
  return new Set([...roundsTeam, ...teamSelectId]);
};
export const saveTeams = (team) => (dispatch, getState) => {
  const { round, teamSelect } = selectDraftConfig(getState());
  const teamSelectItems = toggleArrObj(teamSelect, team, (item) => item.id);
  const teamSelectItemsId = teamSelectItems.map((elem) => elem.id);
  const roundsTeam =
    +round > 1 ? teamRound(round, teamSelectItemsId) : teamSelectItemsId;

  dispatch(setTeamsRound([...roundsTeam]));
  dispatch(setTeams(teamSelectItems));
};

export const pauseRender = (id) => (dispatch, getState) => {
  const { teamSelectId } = selectDraftConfig(getState());
  dispatch(setStatus("pause"));
  dispatch(setTeamsRound([...teamSelectId, id]));
};
export const resetRound = () => {

}

export const saveRound = (roundNum) => (dispatch, getState) => {
  const { teamSelectId } = selectDraftConfig(getState());
  if (teamSelectId.length) {
    const roundsTeam = teamRound(roundNum, teamSelectId);
    dispatch(setTeamsRound([...roundsTeam]));
  }
  dispatch(setRound(roundNum));
};

export default draftConfigSlice.reducer;
