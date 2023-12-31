import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  loading: false,
  error: null,
  message: "",
  liveMyTrades: [],
  liveOtherTrades:[],
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
      state.liveOtherTrades = payload
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

export const tradesAccept = (trades) => (dispatch,getState) =>{
  const { liveMyTrades } = selectLiveTrades(getState());
  const newMyTrades = liveMyTrades.map(trade => {
    
  })  


}
export default liveTradesSlice.reducer
