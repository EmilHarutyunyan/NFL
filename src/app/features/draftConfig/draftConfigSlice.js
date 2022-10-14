import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../../config/config";
import { toggleArrObj } from "../../../utils/utils";

const initialState = {
  teams:[],
  teamSelect: [],
  round:"",
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
     
      state.teamSelect = toggleArrObj(state.teamSelect,action.payload,item => item.id)
      state.status = state.teamSelect.length > 0 ? 'green' : '';
    },
    setAllTeams: (state,action) => {
      state.teamSelect = action.payload ? state.teams : []
    },
    setRound: (state,action) => {
      console.log(action.payload,"action.payload")
      state.round = action.payload
    },
    setPositionPlayer: (state,action) => {
      state.positionPlayer = toggleArrObj(state.positionPlayer,action.payload,item => item)
    },
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

export const { setTeams,setAllTeams,setRound, setPositionPlayer } = draftConfigSlice.actions;

export default draftConfigSlice.reducer;