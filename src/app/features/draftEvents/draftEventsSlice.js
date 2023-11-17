import { createSlice } from "@reduxjs/toolkit";
import {
  draftEventPlayersId,
  draftEventRecentPicks,
  draftEventsGet,
  draftEventsGetId,
  draftEventsList,
  draftEventsPost,
  draftEventsPut,
} from "./draftEventsActions";
import { toggleArrObj } from "../../../utils/utils";
const initialState = {
  loading: false,
  error: null,
  message: "",
  myDraftEvent: [],
  myDraftSingleEvent: null,
  eventList: [],
  eventPlayers: [],
  queuePlayers: [],
  queuePlayersId: [],
  recentPicks: [],
  picksTeams: [],
  start: false,
  millisecond: 6000,
  eventTime: 20000,
  playerPollSettings: {
    position: ["All"],
  },
};

const draftEventsSlice = createSlice({
  name: "draftEvents",
  initialState,
  reducers: {
    setQueuePlayer: (state, { payload }) => {
      state.queuePlayers = payload.players;
      state.queuePlayersId = payload.playersId;
    },
    setPositionPlayersPool: (state, { payload }) => {
      state.playerPollSettings.position = payload;
    },
    setEventTime: (state, { payload }) => {
      state.eventTime = payload;
    },
    setEventStart:(state,{payload}) => {
      state.start = payload
    }
  },
  extraReducers: {
    [draftEventsList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [draftEventsList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.eventList = payload;
      state.error = false;
    },
    [draftEventsList.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload && "Error";
    },
    [draftEventsPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [draftEventsPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
    },
    [draftEventsPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload && "Error";
    },

    [draftEventsGet.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [draftEventsGet.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.myDraftEvent = action.payload;
    },
    [draftEventsGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload && "Error";
    },
    [draftEventsPut.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [draftEventsPut.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
    },
    [draftEventsPut.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload && "Error";
    },

    [draftEventsGetId.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [draftEventsGetId.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.myDraftSingleEvent = action.payload;
    },
    [draftEventsGetId.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload && "Error";
    },
    [draftEventPlayersId.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [draftEventPlayersId.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.eventPlayers = action.payload;
    },
    [draftEventPlayersId.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [draftEventRecentPicks.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [draftEventRecentPicks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.recentPicks = payload.recentPicks;
      state.picksTeams = payload.picksTeams;
    },
    [draftEventRecentPicks.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { showPage, setQueuePlayer, setPositionPlayersPool,setEventStart, setEventTime } =
  draftEventsSlice.actions;



export const selectDraftEvents = (state) => state.draftEvents;

export const addQueuePlayerAction = (player) => (dispatch, getState) => {
 const { queuePlayers } = selectDraftEvents(getState());
 let playersId;
 const players = toggleArrObj(queuePlayers, player, (item) => item.index);
 playersId = players?.map((player) => player.index);
 const playersStringId = players.map(item => {
  return { ...item, id: `${item.id}` };
})

 dispatch(setQueuePlayer({ players: playersStringId, playersId }));

};

export const playerPoolPositionMulti = (pos) => (dispatch, getState) => {
  const { playerPollSettings:{position} } = selectDraftEvents(getState());
  let newPosition = [];

  if (position.length && position.includes(pos) && pos !== "All") {
    newPosition = position.filter((item) => item !== pos);
  } else if (pos === "All") {
    newPosition = [pos];
  } else {
    if (position.includes("All")) {
      const exceptAll = position.filter((item) => item !== "All");
      newPosition = [...exceptAll, pos];
    } else {
      newPosition = [...position, pos];
    }
  }
  if (!newPosition.length) {
    newPosition = ["All"];
  }
  dispatch(setPositionPlayersPool(newPosition));
};
// export const filterPlayerPool = (player) => (dispatch, getState) => {
//   const { queuePlayers } = selectDraftEvents(getState());
//   debugger;
//   let playersId;
//   const players = toggleArrObj(queuePlayers, player, (item) => item.index);
//   playersId = players?.filter((player) => player.index);
//   const playersStringId = players.map((item) => {
//     return { ...item, id: `${item.id}` };
//   });
//   dispatch(setQueuePlayer({ players: playersStringId, playersId }));
// };

export default draftEventsSlice.reducer;


