import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../../config/config";

const initialState = {
  tradesTeams:[],
  changeTrades:false,
  tradesPlayers:[],
  myTradesPlayers:[],
  loading:false,
  tradeValue:[],
  historyTrades:[],
};


export const getTrades = createAsyncThunk(
  "trades/getTrades",
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
      dispatch(setTradesTeams(teamSet));
      return teams;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getTradesPlayer = createAsyncThunk(
  "trades/getTradesPlayer",
  async ({ id }, { dispatch, rejectWithValue }) => {
    
    try {
      const res = await axios.get(
        `${API_ENDPOINT}treading/?position=&round=${id}`
      );

      return res.data.results;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getMyTradesPlayer = createAsyncThunk(
  "trades/getMyTradesPlayer",
  async ({ id }, { dispatch, rejectWithValue }) => {
    
    try {
      const res = await axios.get(
        `${API_ENDPOINT}treading/?position=&round=${id}`
      );

      return res.data.results;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const tradesSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    setTrades: (state, action) => {
      state.trades = action.payload;
    },
    setHistoryTrades: (state, action) => {
      state.historyTrades = action.payload;
    },
    setTradesTeams: (state, action) => {
      state.tradesTeams = action.payload;
    },
    setTeamTradeValue: (state, action) => {
      state.tradeValue = action.payload;
    },
    setTradesPlayers: (state, action) => {
      state.tradesPlayers = action.payload;
    },
    setChangeTrades: (state, action) => {
      state.changeTrades = action.payload;
    },
    setResetTrades: (state, _) => {
      state.trades = initialState.trades;
      state.tradesTeams = initialState.tradesTeams
      state.changeTrades = initialState.changeTrades
      state.tradesPlayers = initialState.tradesPlayers
      state.myTradesPlayers = initialState.myTradesPlayers
      state.loading = initialState.loading
      state.tradeValue = initialState.tradeValue;
    },
  },
  extraReducers: {
    [getTradesPlayer.fulfilled]: (state, action) => {
      state.loading = false;
      
      state.tradesPlayers = action.payload;
    },
    [getTradesPlayer.pending]: (state, action) => {
      state.loading = true;
    },
    [getTradesPlayer.rejected]: (state, action) => {
      state.loading = false;
    },
    [getMyTradesPlayer.fulfilled]: (state, action) => {
      state.loading = false;
      state.myTradesPlayers = action.payload;
    },
    [getMyTradesPlayer.pending]: (state, action) => {
      state.loading = true;
    },
    [getMyTradesPlayer.rejected]: (state, action) => {
      state.loading = false;
    },
    [getTrades.fulfilled]: (state, action) => {
      state.loading = false;
      state.tradeValue = action.payload;
    },
    [getTrades.pending]: (state, action) => {
      state.loading = true;
    },
    [getTrades.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});


export const selectTrades = (state) => state.trades;


export const {
  setTrades,
  setResetTrades,
  setTradesTeams,
  setTradesPlayers,
  setChangeTrades,
  setTeamTradeValue,
  setHistoryTrades,
} = tradesSlice.actions;


// Action Creator
export const historyTradesAction = ({historyData,teamName}) =>  (dispatch, getState) => {
  const {historyTrades} = selectTrades(getState())
  debugger
  if(historyTrades.length) {
    const asd = []
    const newHistoryData = [...historyTrades, historyData];
    for (let tradeTeam of newHistoryData) {
      const keyName = Object.keys(tradeTeam)[0];
      if (keyName === teamName) {
        let newObj = {};
        newObj[`${keyName}`] = historyData;
        asd.push(newObj);
      } else {
        asd.push(tradeTeam);
      }
    }
  }

  dispatch(setHistoryTrades([...historyTrades, historyData]));
  

}


export default tradesSlice.reducer;