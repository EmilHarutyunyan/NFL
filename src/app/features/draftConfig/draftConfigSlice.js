import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../../config/config";
import { toggleArrObj } from "../../../utils/utils";

const initialState = {
  teams: [],
  teamSelect: [],
  teamSelectId: [],
  teamRemoveId: [],
  round: "1",
  possitionalNedd: false,
  bpaCalculated: "",
  userQuantity: 3,
  loading: false,
  positionPlayer: ["All"],
  draftValue: [],
  timeSpeed: 2,
  draftPlayers: [],
  satus: "",
  pauseId: [],
  countRender: 0,
  tradeValue: { mounting: false },
};

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
        draftCongif: { round },
      } = getState();
      const res = await axios.get(
        `${API_ENDPOINT}trade-value-history/?limit=${+round * 32}&offset=0`
      );
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
      state.teamSelect = action.payload;
    },
    setTimeSpeed: (state, action) => {
      state.timeSpeed = action.payload;
    },
    setRound: (state, action) => {
      state.round = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setDraftPlayers: (state, action) => {
      state.draftPlayers.push(action.payload);
    },

    setPositionPlayer: (state, action) => {
      // state.positionPlayer = toggleArrObj(state.positionPlayer,action.payload,(item) => item);
      state.positionPlayer = action.payload;
    },
    setTeamsRound: (state, action) => {
      const teamSelectSort = action.payload.sort(function (a, b) {
        return a - b;
      });
      state.teamSelectId = teamSelectSort;
    },
    setPauseId: (state, action) => {
      state.pauseId = [action.payload];
      const teamSelectSort = [...state.teamSelectId, action.payload].sort(
        function (a, b) {
          return a - b;
        }
      );
      state.teamSelectId = teamSelectSort;
    },
    setResetRound: (state, _) => {
      state.teamSelectId = [];
      state.teamRemoveId = [];
      state.teamSelect = [];
      state.round = "1";
      state.countRender = 0;
      state.positionPlayer = [];
      state.pauseId = [];
      state.draftValue = [];
      state.timeSpeed = 2;
      state.positionPlayer = ["All"];
      state.possitionalNedd = false;
      state.teams = [];
      state.loading = false;
      state.draftPlayers = [];
      state.status = "";
      state.tradeValue = { mounting: false };
    },
    setTeamRemoveId: (state, action) => {
      state.teamRemoveId = [action.payload];
    },
    setTradeValue: (state, action) => {
      state.tradeValue = action.payload;
    },
    delPauseId: (state, _) => {
      state.teamSelectId = state.teamSelectId.filter(
        (id) => id !== state.pauseId[0]
      );
      state.pauseId = [];
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
    [getTradeValue.fulfilled]: (state, action) => {
      state.loading = false;
      state.tradeValue = { mounting: true, ...action.payload };
    },
    [getTradeValue.pending]: (state, action) => {
      state.loading = true;
    },
    [getTradeValue.rejected]: (state, action) => {
      state.loading = false;
    },
    [getDraftValue.fulfilled]: (state, action) => {
      state.loading = false;
      state.draftValue = action.payload?.results;
    },
    [getDraftValue.pending]: (state, action) => {
      state.loading = true;
    },
    [getDraftValue.rejected]: (state, action) => {
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
  setTimeSpeed,
  setPauseId,
  delTeamsRound,
  setResetRound,
  setTradeValue,
  setDraftPlayers,
  setTeamRemoveId,
  delPauseId,
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



// Actions Creator
export const selectAllTeams = (check) => (dispatch, getState) => {
  const { teams, round } = selectDraftConfig(getState());
 
  const teamSelectItemsId = teams.map((elem) => elem.id);
  const roundsTeam = +round > 1 ? teamRound(round, teamSelectItemsId) : teamSelectItemsId;

  dispatch(setTeamsRound(check ? [...roundsTeam] : []));
  dispatch(setAllTeams(check ? teams : []))

  // dispatch(saveTeams(teams))
}

export const saveTeams = (team) => (dispatch, getState) => {
  const { round, teamSelect } = selectDraftConfig(getState());
  const teamSelectItems = toggleArrObj(teamSelect, team, (item) => item.id)
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

export const saveRound = (roundNum) => (dispatch, getState) => {
  const { teamSelectId } = selectDraftConfig(getState());
  if (teamSelectId.length) {
    const roundsTeam = teamRound(roundNum, teamSelectId);
    dispatch(setTeamsRound([...roundsTeam]));
  }
  dispatch(setRound(roundNum));
};
export const setDraftPlayersAction = (player) => (dispatch, getState) => {
  const { draftPlayers } = selectDraftConfig(getState());
  const checkPlayer = draftPlayers.some(
    (item) => item.player.id === player.player.id
  );

  if (!checkPlayer) {
    dispatch(setDraftPlayers(player));
  }
};

export default draftConfigSlice.reducer;