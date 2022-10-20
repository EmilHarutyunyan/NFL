import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../../config/config";
import { toggleArrObj } from "../../../utils/utils";

const initialState = {
  teams:[],
  teamSelect: [],
  teamSelectId : [],
  round:"1",
  possitionalNedd: false,
  bpaCalculated: "",
  userQuantity: 3,
  loading: false,
  positionPlayer:[],
  draftPlayers: [
    {
      id:1,
      rank:'35',
      adp:'42.1',
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: 'QB',
      collegeName:'Ohio State',
      collegeImg: '',
    },
    {
      id:1,
      rank:'35',
      adp:'42.1',
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: 'QB',
      collegeName:'Ohio State',
      collegeImg: '',
    },
    {
      id:1,
      rank:'35',
      adp:'42.1',
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: 'QB',
      collegeName:'Ohio State',
      collegeImg: '',
    },
    {
      id:1,
      rank:'35',
      adp:'42.1',
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: 'QB',
      collegeName:'Ohio State',
      collegeImg: '',
    },
    {
      id:1,
      rank:'35',
      adp:'42.1',
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: 'QB',
      collegeName:'Ohio State',
      collegeImg: '',
    },
    {
      id:1,
      rank:'35',
      adp:'42.1',
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: 'QB',
      collegeName:'Ohio State',
      collegeImg: '',
    },
    {
      id:1,
      rank:'35',
      adp:'42.1',
      img: "",
      playerName: "Christian Mccaffrey",
      positionPlayer: 'QB',
      collegeName:'Ohio State',
      collegeImg: '',
    },
  ],
  satus: ''
};


export const getTeams = createAsyncThunk(
  "draftConfig/getTeams",
  async (_, { dispatch, rejectWithValue }) => {
    try {
     
      const res = await axios.get(
        `${API_ENDPOINT}rounds/?limit=32`
      );
      return res.data
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
  name: 'draftConfig',
  initialState,
  reducers: {
    setTeams: (state, action) => {
      const teamSelectItems = toggleArrObj(state.teamSelect,action.payload,item => item.id)
      state.teamSelect = teamSelectItems
      state.teamSelectId = teamSelectItems.map((elem) => elem.id)
      console.log(',action.payload :', action.payload);

      state.status = state.teamSelect.length > 0 ? 'green' : '';
    },
    setAllTeams: (state,action) => {
      state.teamSelect = action.payload ? state.teams : []
    },
    setRound: (state,action) => {
      
      state.round = action.payload
    },
    setPositionPlayer: (state,action) => {
      state.positionPlayer = toggleArrObj(state.positionPlayer,action.payload,item => item)
    },
    setTeamsRound : (state,action) =>{
      state.teamSelectId = action.payload
    }
  },
  extraReducers: {
    [getTeams.fulfilled]: (state, action) => {
      state.loading = false;
      state.teams = action.payload?.results
    },
    [getTeams.pending]: (state, action) => {
     
      state.loading = true;
    },
    [getTeams.rejected]: (state, action) => {
      state.loading = false;
    },
  }
})

export const selectDraftConfig = (state) => state.draftCongif;


export const { setTeams,setAllTeams,setRound, setPositionPlayer,setTeamsRound } = draftConfigSlice.actions;

export const saveRound = (roundNum) => (dispatch, getState) => {
  const {teamSelectId} = selectDraftConfig(getState());
  if(teamSelectId.length) {
    const roundsTeam = []
    for(let value of teamSelectId) {
      for(let i=1; i < roundNum; i++) {
        roundsTeam.push(value + (i*32))
      }
    }
    
    console.log('roundsTeam :', roundsTeam);
    dispatch(setTeamsRound([...teamSelectId,...roundsTeam]))

  } 
  dispatch(setRound(roundNum))
  
};

export default draftConfigSlice.reducer;