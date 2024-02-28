import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  message: "",
  liveMyTrades: [],
  liveOtherTrades: [],
};

const liveTradesSlice = createSlice({
  name: "liveTrades",
  initialState,
  reducers: {
    setLiveMyTrades: (state, { payload }) => {
      state.liveMyTrades.push(payload);
    },
    setLiveOtherTrades: (state, { payload }) => {
      state.liveOtherTrades.push(payload);
    },
    setLiveOtherAllTrades: (state, { payload }) => {
      state.liveOtherTrades = payload;
    },
    setLiveMyAllTrades: (state, { payload }) => {
      state.liveMyTrades = payload;
    },
  },
  // extraReducers: {
  // },
});

export const {
  setLiveMyTrades,
  setLiveOtherTrades,
  setLiveOtherAllTrades,
  setLiveMyAllTrades,
} = liveTradesSlice.actions;

export const selectLiveTrades = (state) => state.liveTrades;

export const tradesAccept = (trades) => (dispatch, getState) => {
  // const { liveMyTrades } = selectLiveTrades(getState());
  // const newMyTrades = liveMyTrades.map((trade) => {});
};
export const notAvailable = (trades) => (dispatch, getState) => {
  const { liveMyTrades, liveOtherTrades } = selectLiveTrades(getState());
  const allPickRound = trades.picks.map((item) => {
    let pickRoundMerge = item.round_index_number + item.pick;
    return +pickRoundMerge;
  }
  );
  const newLiveMyTrades = liveMyTrades.map((team) => {
    const pickRound = team.picks.map((item) => {
      let pickRoundMerge = item.round_index_number + item.pick;
      return +pickRoundMerge;
    }
    );
    if (team.id === trades.id) {
      return team;
    }
    const isPick = allPickRound.some((element) => pickRound.includes(element));
    if (isPick) {
      const status = {};
      for (const key of Object.keys(team.status)) {
        status[`${key}`] = "no longer available";
      }
      return {
        ...team,
        status
      };
    }
    return team;
  });
  const newLiveOtherTrades = liveOtherTrades.map((team) => {
    const pickRound = team.picks.map((item) => {
      let pickRoundMerge = item.round_index_number + item.pick;
      return +pickRoundMerge
    }
     
    );
    if (team.id === trades.id) {
      return team;
    }
    const isPick = allPickRound.some((element) => pickRound.includes(element));
    if (isPick) {
      const status = {}
      for (const key of Object.keys(team.status)) {
        status[`${key}`] = "no longer available";
      }
      return {
        ...team,
        status
      };
    }
    return team;
  });
  
  const newMyTrades = newLiveMyTrades.map((team) => {
    
    if (trades.id === team.id) {
      return {
        ...team,
        ...trades,
      };
    }
    return team;
  });
  dispatch(setLiveOtherAllTrades(newLiveOtherTrades));
  dispatch(setLiveMyAllTrades(newMyTrades));
};

export const rejectTrade = (trades) => (dispatch, getState) => {
 const { liveMyTrades } = selectLiveTrades(getState());
 const newMyTrades = liveMyTrades.map((item) => {
  if(item.id === trades.id) {
    return {
      ...item,
      status:trades.status
    }
  }
  return item
 })
  dispatch(setLiveMyAllTrades(newMyTrades));
};
export default liveTradesSlice.reducer;
