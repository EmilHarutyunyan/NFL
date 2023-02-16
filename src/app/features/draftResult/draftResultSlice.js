import { createSlice } from "@reduxjs/toolkit";
// import {dataResult} from "./data"
// const initialState = dataResult

const initialState = {
  results: [],
  roundTeam: 1,
  teamsName: [],
  teamsPlayer: {}
}


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

  
  const setRound = []
  const teamsSelectName = teamSelect.map(item => item.name)
  const teamsPlayer = {}
  debugger
  for (let i = 1; i <= round; ++i) {
    setRound.push(`Round ${i}`)
  }

  for (let index of teamPickIndexControl) {
    for (let team of teams) {
      if (index === team.pick) {
        const teamNameItem = team.round.name;
        if (teamsPlayer[teamNameItem]) {
          teamsPlayer[teamNameItem].push(team);
        } else {
          teamsPlayer[teamNameItem] = [team];
        }
      }

    }
  }
  
  dispatch(setDraftResult({ results: teams, roundTeam: setRound, teamsName: teamsSelectName, teamsPlayer, draftRandomnessTeam }));
};

export default draftResultSlice.reducer;


// for (let i = 0; i < teamSelect.length; ++i) {
//   const teamNameItem = teamSelect[i].name
//   teamsSelectName.push(teamNameItem)
//   for (let j = 0; j < round; ++j) {
//     const teamId = (teamSelect[i].id - 1) + 32 * j;
//     if (teamsPlayer[teamNameItem]) {
//       teamsPlayer[teamNameItem].teams.push(teams[teamId])
//     }
//     else {
//       teamsPlayer[teamNameItem] = { 'team': teams[teamId].round, 'teams': [teams[teamId]] }
//     }

//   }
// }