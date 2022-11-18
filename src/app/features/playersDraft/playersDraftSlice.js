import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINT } from "../../../config/config";

const initialState = {
  loading: false,
  count: 0,
  pageSize:6,
  currentPage: 1,
  limit: 700,
  offset: 0,
  results: [],
  search: "",
  position:"",
  colleage:"",
  playerChoose:[],
  playerItems:[],
};

export const getPlayersDraft = createAsyncThunk(
  "playersDraft/getPlayersDraft",
  async (_,{ dispatch, getState, rejectWithValue }) => {
    
    try {
      const res = await axios.get(
        `${API_ENDPOINT}players/?limit=700&offset=${0}&search=&position=&school`
      );
      const resData = { ...res.data };
      
      dispatch(setPlayersDraft(resData));
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const searchPlayersDraft = createAsyncThunk(
  "playersDraft/searchPlayersDraft",
  async (search, { dispatch,getState,rejectWithValue }) => {
    try {
      const {
        playersDraft: { position,colleage },
      } = getState();
      const res = await axios.get(
        `${API_ENDPOINT}players/?limit=${18}&offset=${0}&search=${search}&position=${position}&school=${colleage}`
      );
      const resData = { ...res.data, search };
      dispatch(setPlayersDraft(resData));
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const postitionPlayersDraft = createAsyncThunk(
  "playersDraft/postitionPlayersDraft",
  async (position, { dispatch,getState,rejectWithValue }) => {
    try {

      const {
        players: { colleage,limit },
      } = getState();
        
      
      const res = await axios.get(
        `${API_ENDPOINT}players/?limit=${limit}&offset=${0}&search=&position=${position}&school=${colleage}`
      );
      const resData = {...initialState,...res.data,limit,position};

      dispatch(setPlayersDraft(resData));
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const colleagePlayersDraft = createAsyncThunk(
  "playersDraft/colleagePlayersDraft",
  async (colleage, { dispatch,getState,rejectWithValue }) => {
    try {
      const {
        playersDraft: { position },
      } = getState();
      const res = await axios.get(
        `${API_ENDPOINT}players/?limit=${18}&offset=${0}&search=&position=${position}&school=${colleage}`
      );
      const resData = { ...initialState,...res.data, colleage };
      dispatch(setPlayersDraft(resData));
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const playersDraftSlice = createSlice({
  name: "playersDraft",
  initialState,
  reducers: {
    setPlayersDraft: (state, action) => {
      state.limit = action.payload?.limit || state.limit;
      state.offset = action.payload?.offset || state.offset;
      state.currentPage = action.payload?.currentPage || state.currentPage;
      state.search = action.payload?.search || state.search;
      state.position = action.payload?.position || state.position;
      state.colleage = action.payload?.colleage || state.colleage;
      state.count = action.payload.count;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
      state.results = action.payload.results;
    },
    setSearchPlayers: (state, action) => {
      state.search = action.payload
    },
    setPositionPlayersDraft: (state, action) => {
      state.position = action.payload
    },
    setColleagePlayers: (state, action) => {
      state.colleage = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPlayerItems: (state,action) => {
      state.playerItems = action.payload
    }
  },
  extraReducers: {
    [getPlayersDraft.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [getPlayersDraft.pending]: (state, action) => {
      
      state.loading = true;
    },
    [getPlayersDraft.rejected]: (state, action) => {
      state.loading = false;
    },
    [searchPlayersDraft.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [searchPlayersDraft.pending]: (state, action) => {
      state.loading = true;
    },
    [searchPlayersDraft.rejected]: (state, action) => {
      state.loading = false;
    },
    [postitionPlayersDraft.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [postitionPlayersDraft.pending]: (state, action) => {
      state.loading = true;
    },
    [postitionPlayersDraft.rejected]: (state, action) => {
      state.loading = false;
    },
    [colleagePlayersDraft.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [colleagePlayersDraft.pending]: (state, action) => {
      state.loading = true;
    },
    [colleagePlayersDraft.rejected]: (state, action) => {
      state.loading = false;
    },
    
  },
});

export const selectPlayersDraft = (state) => state.playersDraft;
export const { setPlayersDraft,setSearchPlayers,setPositionPlayersDraft,setColleagePlayers,setCurrentPage,setPlayerItems } = playersDraftSlice.actions;

// Action Creator Thunk
export const positionAction = (positionValue) => (dispatch, getState) => {
  const {
    playersDraft: { limit },
  } = getState();
  if(positionValue === '') {
    dispatch(setPositionPlayersDraft(""))
    dispatch(getPlayersDraft(limit))
  } else {
    dispatch(postitionPlayersDraft(positionValue));
  }
};

export const colleageAction = (colleageValue) => (dispatch, getState) => {
  if(colleageValue === '') {
    dispatch(setColleagePlayers(""))
    dispatch(getPlayersDraft())
  } else {
    dispatch(colleagePlayersDraft(colleageValue));
  }
};
export default playersDraftSlice.reducer;
