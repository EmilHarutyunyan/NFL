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
      state.results = action.payload;
    },
    setRoundTeam: (state, action) => {
      state.roundTeam = action.payload;
    },
    setTeamsName: (state, action) => {
      state.teamsName = action.payload
    },
    setTeamsPlayer: (state, action) => {
      state.teamsPlayer = action.payload
    },
    resDraftResult: (state, action) => {
      state.results = []
      state.roundTeam = 1
    }
  }
})
export const selectDraftResult = (state) => state.draftResult;

export const { setDraftResult, setRoundTeam, setTeamsName, setTeamsPlayer, resDraftResult } = draftResultSlice.actions;

export const setDraftResultAction = (teams, teamSelect, round) => (dispatch, getState) => {

  const setRound = []
  const teamsSelectName = []
  const teamsPlayer = {}

  for (let i = 1; i <= round; ++i) {
    setRound.push(`${i} Round`)
  }
  for (let i = 0; i < teamSelect.length; ++i) {
    const teamNameItem = teamSelect[i].name
    teamsSelectName.push(teamNameItem)
    for (let j = 0; j < round; ++j) {
      const teamId = (teamSelect[i].id - 1) + 32 * j;
      if (teamsPlayer[teamNameItem]) {
        teamsPlayer[teamNameItem].push(teams[teamId])
      }
      else {
        teamsPlayer[teamNameItem] = [teams[teamId]]
      }

    }
  }

  dispatch(setRoundTeam(setRound))
  dispatch(setDraftResult(teams));
  dispatch(setTeamsName(teamsSelectName))
  dispatch(setTeamsPlayer(teamsPlayer))
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