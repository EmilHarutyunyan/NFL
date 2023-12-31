import { createSlice } from "@reduxjs/toolkit";
import {
  getLiveDraftInfo,
  getLiveTeams,
  joinEvent,
  liveEventsList,
  liveEventsSession,
  myLiveEventGet,
} from "./liveDraftActions";
import { toggleArrObj } from "../../../utils/utils";
import { TIME_CONFIG } from "../../../config/config";
const initialState = {
  loading: false,
  error: null,
  message: "",
  isFinishLiveDraft: false,
  eventStartTime: 0,
  eventId: null,
  eventInfo: null,
  myLiveTeam: null,
  joinTeam: false,
  liveTeams: [],
  eventList: [],
  eventPlayers: [],
  queuePlayers: [],
  queuePlayersId: [],
  recentPicks: [],
  picksTeams: [],
  start: false,
  firstStart: false,
  millisecondToMinute: 60000,
  millisecondToSecond: 50,
  minuteToSecond: 60,
  eventTime: 900000,
  myEventTeam: null,
  roomMessages: [],
  myPlayerTeam: [],
  positionPicks: 0,
  roundPick: 1,
  pickBoard: [],
  addTime: 0,
  nextMyEvent: false,
  manualChoose: false,
  playerPollSettings: {
    position: ["All"],
  },
};

const liveDraftSlice = createSlice({
  name: "liveDraft",
  initialState,
  reducers: {
    setAddTime:(state,{payload}) => {
        state.addTime = payload;
    },
    setMyLiveTeam: (state, { payload }) => {
      state.myLiveTeam = payload;
    },
    setQueuePlayer: (state, { payload }) => {
      state.queuePlayers = payload.players;
      state.queuePlayersId = payload.playersId;
    },
    setPositionPlayersPool: (state, { payload }) => {
      state.playerPollSettings.position = payload;
    },
    setEventTime: (state, { payload }) => {
      state.eventTime = payload.time;
      state.manualChoose = payload.manualChoose;
    },
    setEventStart: (state, { payload }) => {
      state.start = payload;
    },
    setFirstStart: (state, { payload }) => {
      state.firstStart = payload;
    },
    setRoomMessages: (state, { payload }) => {
      state.roomMessages.push(payload);
    },
    setRecentPicks: (state, { payload }) => {
      state.recentPicks = payload;
    },
    setPositionPicks: (state, { payload }) => {
      state.positionPicks = payload;
    },
    setMyPlayerTeam: (state, { payload }) => {
      state.myPlayerTeam.push(payload);
    },
    setEventPlayers: (state, { payload }) => {
      state.eventPlayers = payload;
    },
    setPickBoard: (state, { payload }) => {
      state.pickBoard.push(payload);
    },
    setRoundPick: (state, { payload }) => {
      state.roundPick = payload;
    },
    setNextMyEvent: (state, { payload }) => {
      state.nextMyEvent = payload;
    },
    setIsFinishLiveDraft: (state, { payload }) => {
      state.isFinishLiveDraft = payload;
    },

    resetLiveDraft: () => initialState,
  },
  extraReducers: {
    [getLiveTeams.fulfilled]: (state, action) => {
      state.loading = false;
      state.liveTeams = action.payload;
    },
    [getLiveTeams.pending]: (state, action) => {
      state.loading = true;
    },
    [getLiveTeams.rejected]: (state, action) => {
      state.loading = false;
    },
    [joinEvent.fulfilled]: (state, action) => {
      state.joinTeam = false;
      state.error = null;
    },
    [joinEvent.pending]: (state, action) => {
      state.joinTeam = true;
      state.error = null;
    },
    [joinEvent.rejected]: (state, action) => {
      state.joinTeam = false;
      state.error = "Something Error";
    },
    [liveEventsList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [liveEventsList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.eventList = payload;
      state.error = false;
    },
    [liveEventsList.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload && "Error";
    },

    [getLiveDraftInfo.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getLiveDraftInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.eventPlayers = payload.eventPlayers;
      state.myEventTeam = payload.myEventTeam;
      state.recentPicks = payload.recentPicks;
      state.picksTeams = payload.picksTeams;
      state.nextMyEvent = payload.nextMyEvent;
      state.eventTime = payload.eventTime;
      state.error = false;
    },
    [getLiveDraftInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    [liveEventsSession.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [liveEventsSession.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.eventId = payload.eventId;
      state.eventInfo = payload.eventInfo;
      state.eventStartTime = payload.eventStartTime;
      state.error = false;
    },
    [liveEventsSession.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      
      state.message = action.payload || "Error";
    },
    [myLiveEventGet.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [myLiveEventGet.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.eventId = payload.eventId;
      state.eventInfo = payload.eventInfo;
      state.error = false;
    },
    [myLiveEventGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload && "Error";
    },
  },
});

export const {
  resetLiveDraft,
  setMyLiveTeam,
  setQueuePlayer,
  setPositionPlayersPool,
  setEventTime,
  setEventStart,
  setRecentPicks,
  setPositionPicks,
  setMyPlayerTeam,
  setRoomMessages,
  setEventPlayers,
  setPickBoard,
  setRoundPick,
  setFirstStart,
  setNextMyEvent,
  setIsFinishLiveDraft,
  setAddTime,
} = liveDraftSlice.actions;

export const selectLiveDraft = (state) => state.liveDraft;

export const addQueuePlayerAction = (player) => (dispatch, getState) => {
  const { queuePlayers } = selectLiveDraft(getState());
  let playersId;
  const players = toggleArrObj(queuePlayers, player, (item) => item.index);
  playersId = players?.map((player) => player.index);
  const playersStringId = players.map((item) => {
    return { ...item, id: `${item.id}` };
  });

  dispatch(setQueuePlayer({ players: playersStringId, playersId }));
};

export const playerPoolPositionMulti = (pos) => (dispatch, getState) => {
  const {
    playerPollSettings: { position },
  } = selectLiveDraft(getState());
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
export const livePicksChoose = (player) => (dispatch, getState) => {
  const {
  
    millisecondToMinute,
    recentPicks,
    positionPicks,
    myEventTeam,
    eventPlayers,
    roundPick,
    addTime
  } = selectLiveDraft(getState());

  let myTeam = null;
  let pick = 1;
  let round_index_number = 1;
  let pickBoard = null;
  let playerPick = player ? player : eventPlayers[0];
  let nextRound = 1;
  let isFinishLive = false;
  let nextMyEvent = false;
  
  if (myEventTeam && recentPicks[positionPicks + 1]?.round?.id) {
    nextMyEvent =
      recentPicks[positionPicks + 1].round.id === myEventTeam.round.id;
  }

  const recentPicksPlayer = recentPicks.map((team, idx) => {
    if (idx === positionPicks) {
      if (myEventTeam && myEventTeam.round.id === team.round.id) myTeam = team;
      pick = team.pick;
      round_index_number = team.round_index_number;
      pickBoard = { ...team, player: playerPick };
      return { ...team, player: playerPick };
    }
    return team;
  }, []);
  if (recentPicks.length - 1 > positionPicks) {
    nextRound = +recentPicks[positionPicks + 1].round_index_number;
  } else {
    nextRound = +recentPicks[positionPicks].round_index_number;
    isFinishLive = true;
  }
  const filterPlayer = eventPlayers.filter((pl) => pl.id !== playerPick.id);

  // const nextPickRound =
  //   roundPick > nextRound ? TIME_CONFIG[`${}`];

  const eventTime = nextRound <= roundPick ? TIME_CONFIG[`${nextRound}`] : 45000;
  const addEventTime = eventTime + addTime*1000;
  dispatch(setRoundPick(nextRound));
  dispatch(setEventTime({ time: addEventTime, manualChoose: false }));

  if (myTeam && myEventTeam) {
    dispatch(setMyPlayerTeam({ ...playerPick, pick, round_index_number }));
  }
  dispatch(setNextMyEvent(nextMyEvent));
  dispatch(setRecentPicks(recentPicksPlayer));
  let newPosition = positionPicks + 1;
  dispatch(setPositionPicks(newPosition));
  dispatch(setEventPlayers(filterPlayer));
  dispatch(setPickBoard(pickBoard));
  isFinishLive && dispatch(setIsFinishLiveDraft(isFinishLive));

  // const playerRecentPicks = recentPicks.map(team)
};

export default liveDraftSlice.reducer;
