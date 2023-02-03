import { createSlice } from "@reduxjs/toolkit";
import { toggleArrObj } from "../../../utils/utils";
import { getTeams, getTradeValue } from "./drafConfigAction";

const initialState = {
  advancedSetting: false,
  teams: [],
  teamSelect: [],
  teamSelectId: [],
  teamSelectIdRound: [],
  teamPickIndex:[],
  teamPickIndexControl:[],
  teamRemoveId: [],
  round: 1,
  positionalNeed: false,
  bpaCalculated: "",
  userQuantity: 3,
  loading: false,
  positionPlayer: ["All"],
  timeSpeed: 2,
  draftPlayers: [],
  draftCardDepth: 2,
  draftRandomness:2,
  selectCardDepth: [],
  roundDepth:5,
  roundBPA: [],
  draftRandomnessTeam:[],
  pauseId: [],
  countRender: 0,
  tradeValue: { mouthing: false },
  reserveTradeValue:[],
  changeTrade:false
};


export const draftConfigSlice = createSlice({
  name: "draftConfig",
  initialState,
  reducers: {
    setChangeTrade:(state,action) => {
      state.changeTrade = action.payload;
    },
    setSelectCardDepth:(state,action) => {
      state.selectCardDepth.push(action.payload)
    },
    setRoundBPA: (state,action)=> {
      state.roundBPA = action.payload
    },
    setRoundDepth: (state,action) => {
      state.roundDepth = action.payload
    },
    setAdvancedSetting: (state,action) => {
      state.advancedSetting = action.payload;
    },
    setTeamPickIndex: (state, action) => {
      state.teamPickIndex = action.payload
      state.teamPickIndexControl = action.payload
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
      state.countRender += 1;
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
    changeTradeValue: (state, action) => {
      state.tradeValue.results = action.payload
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
      
      state.teamPickIndex = state.teamPickIndex.filter(
        (item) => action.payload !== item
      );
    },
    setResetRound: (state, _) => {
      state.draftCardDepth = 2;
      state.draftRandomness = 2;
      state.draftRandomnessTeam = [];
      state.teamSelectId = [];
      state.teamRemoveId = [];
      state.teamSelect = [];
      state.round = "1";
      state.countRender = 0;
      state.positionPlayer = [];
      state.pauseId = [];
      state.timeSpeed = 2;
      state.positionPlayer = ["All"];
      state.positionalNeed = false;
      state.teams = [];
      state.loading = false;
      state.draftPlayers = [];
      state.status = "";
      state.tradeValue = { mouthing: false };
      state.advancedSetting = false
      state.changeTrade = false;

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
      state.reserveTradeValue = action.payload.results
    },
    [getTradeValue.pending]: (state, action) => {
      state.loading = true;
    },
    [getTradeValue.rejected]: (state, action) => {
      state.loading = false;
    }
  },
});

export const selectDraftConfig = (state) => state.draftConfig;

export const {
  setChangeTrade,
  setRoundBPA,
  setRoundDepth,
  setAdvancedSetting,
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
  setSelectCardDepth,
  changeTradeValue,
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
export const checkRoundBPA = (round) => (dispatch, getState) => {
  const { roundBPA } = selectDraftConfig(getState());
  const intRound = +round
  const addOrRemove = roundBPA.includes(intRound) ? roundBPA.filter(i => i !== intRound) : [...roundBPA, intRound];
  dispatch(setRoundBPA(addOrRemove))
}

export const delRoundBPA = (roundIndex) => (dispatch, getState) => {
  const { roundBPA } = selectDraftConfig(getState());
  let newBPA = []
  if (+roundIndex > 2) {
    dispatch(setRoundBPA([]))
  }
  else {
    
    newBPA = roundBPA.sort(function (a, b) {
      return a - b;
    });
    dispatch(setRoundBPA(newBPA.slice(1)))

  }
}

export const selectAllTeams = (check) => (dispatch, getState) => {
  const { teams, round } = selectDraftConfig(getState());
  const teamSelectItemsId = teams.map((elem) => elem.index);
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

export const changeTradeTeam = (tradeValue,teamTrade) => (dispatch,getState) =>{
  const { teamSelectId,teamSelect,team } = selectDraftConfig(getState());
  const newTeamSelect = team.filter(item => item.name === teamTrade.round.name)

}

export default draftConfigSlice.reducer;