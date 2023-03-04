import { createSlice } from "@reduxjs/toolkit";
// import {dataResult} from "./data"
// const initialState = dataResult

const initialState = {
  results: [],
  roundTeam: 1,
  teamsName: [],
  teamsPlayer: {},
  bpa_badges: 0,
  fanatic_mode: 0,
};


const draftResultSlice = createSlice({
  name: "draftResult",
  initialState,
  reducers: {
    setDraftResult: (state, action) => {
      state.results = action.payload.results;
      state.roundTeam = action.payload.roundTeam;
      state.teamsName = action.payload.teamsName
      state.teamsPlayer = action.payload.teamsPlayer
      state.draftRandomnessTeam = action.payload.draftRandomnessTeam;
      state.bpa_badges = action.payload.bpa_badges;
      state.fanatic_mode = action.payload.fanatic_mode;
    },
    resDraftResult: (state, action) => {
      state.results = []
      state.roundTeam = 1
    }
  }
})
export const selectDraftResult = (state) => state.draftResult;

export const { setDraftResult, setRoundTeam, setTeamsName, setTeamsPlayer, resDraftResult } = draftResultSlice.actions;

export const setDraftResultAction = (teams, teamSelect, round, teamPickIndexControl, draftRandomnessTeam) => (dispatch, getState) => {

  const {draftConfig: {fanaticChallenge}} = getState()
  
  const setRound = []
  const teamsSelectName = teamSelect.map(item => item.name)
  const teamsPlayer = {}
  let bpa_badges = 0;
  const fanatic_mode = fanaticChallenge.length;
  
  for (let i = 1; i <= round; ++i) {
    setRound.push(`Round ${i}`)
  }
  
  for (let index of teamPickIndexControl) {
    
    for (let team of teams) {
      if (index === team.index) {
        const teamNameItem = team.round.name;
        if (teamsPlayer[teamNameItem]) {
          teamsPlayer[teamNameItem].push(team);
        } else {
          teamsPlayer[teamNameItem] = [team]; 
        }
        if (team?.player?.bpa === 1) {
          bpa_badges++;
        }
      }

    }
  }
  
  dispatch(
    setDraftResult({
      results: teams,
      roundTeam: setRound,
      teamsName: teamsSelectName,
      teamsPlayer,
      draftRandomnessTeam,
      bpa_badges,
      fanatic_mode,
    })
  );
};

export default draftResultSlice.reducer;