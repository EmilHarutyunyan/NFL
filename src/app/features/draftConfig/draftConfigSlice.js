import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../../config/config";
import { toggleArrObj } from "../../../utils/utils";

const initialState = {
  teams: [],
  teamSelect: [],
  teamSelectId: [],
  teamSelectIdRound: [],
  teamPickIndex:[],
  teamRemoveId: [],
  round: 1,
  positionalNeed: false,
  bpaCalculated: "",
  userQuantity: 3,
  loading: false,
  positionPlayer: ["All"],
  draftValue: [],
  timeSpeed: 2,
  draftPlayers: [],
  draftCardDepth: 2,
  draftRandomness:2,
  draftRandomnessTeam:[],
  pauseId: [],
  countRender: 0,
  tradeValue: { mouthing: false },
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
        draftConfig: { round, teamSelectId },
      } = getState();
      const res = await axios.get(
        `${API_ENDPOINT}trade-value-history/?limit=1000&offset=0&round=&round_index_number=${round}&tm=`
      );
      const teamPickIndex = res.data.results.filter((team) => teamSelectId.includes(team.round.id)).map(team => team.index)
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
    setTeamPickIndex: (state, action) => {
      state.teamPickIndex = action.payload
    },
    setDraftCardDepth: (state,action) => {
      state.draftCardDepth = action.payload;
    },
    setDraftRandomnessTeam: (state, action) => {
      state.draftRandomnessTeam = action.payload
    },
    setDraftRandomness: (state,action) => {
      state.draftRandomness = action.payload
    },
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
    setFirstTradeValue: (state, action) => {
      state.tradeValue = action.payload
    },
    setResetRound: (state, _) => {
      state.draftCardDepth= 2;
      state.draftRandomness = 2;
      state.draftRandomnessTeam = [];
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
      state.positionalNeed = false;
      state.teams = [];
      state.loading = false;
      state.draftPlayers = [];
      state.status = "";
      state.tradeValue = { mouthing: false };
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
      debugger
      state.teamPickIndex = state.teamPickIndex.filter(
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
      state.tradeValue = { mouthing: true, ...action.payload };
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

export const selectDraftConfig = (state) => state.draftConfig;

export const {
  setTeamPickIndex,
  setDraftCardDepth,
  setDraftRandomnessTeam,
  setDraftRandomness,
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
  setFirstTradeValue,
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

}

export const saveTeams = (team) => (dispatch, getState) => {
  const { round, teamSelect } = selectDraftConfig(getState());
  const teamSelectItems = toggleArrObj(teamSelect, team, (item) => item.index)
  const teamSelectItemsId = teamSelectItems.map((elem) => elem.index);
  const roundsTeam = +round > 1 ? teamRound(round, teamSelectItemsId) : teamSelectItemsId;

  dispatch(setTeamsRound([...roundsTeam]));
  dispatch(setTeams(teamSelectItems));
};

// export const pauseRender = (id) => (dispatch, getState) => {
//   const { teamSelectId } = selectDraftConfig(getState());
//   dispatch(setStatus("pause"));
//   dispatch(setTeamsRound([...teamSelectId, id]));
// };

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