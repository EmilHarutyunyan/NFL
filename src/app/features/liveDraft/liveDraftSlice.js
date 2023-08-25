import { createSlice } from '@reduxjs/toolkit'
import { getLiveTeams } from './liveDraftActions';
const initialState = {
  loading: false,
  error: null,
  message: "",
  myLiveTeam: {},
  otherLiveTeam: [
    {
      round: {
        id: 5,
        name: "Jets",
        adp: null,
        index: 5,
        logo: "https://api.nfldraftfanatics.com/media/nyj.png",
      },
      id: 64,
      team_neads_info: [
        {
          id: 276,
          priority: "P4",
          created_at: "2022-11-01T07:32:15.724704Z",
          updated_at: "2023-02-26T16:25:23.923067Z",
          team_neads: {
            id: 64,
            created_at: "2022-11-01T07:32:15.706988Z",
            updated_at: "2023-02-26T16:25:23.922185Z",
            round: 5,
          },
          positions: [
            {
              id: 5,
              name: "OT",
            },
            {
              id: 8,
              name: "S",
            },
            {
              id: 11,
              name: "LB",
            },
            {
              id: 13,
              name: "G",
            },
          ],
        },
        {
          id: 277,
          priority: "P7",
          created_at: "2022-11-01T07:32:15.746290Z",
          updated_at: "2023-02-26T16:25:23.926466Z",
          team_neads: {
            id: 64,
            created_at: "2022-11-01T07:32:15.706988Z",
            updated_at: "2023-02-26T16:25:23.922185Z",
            round: 5,
          },
          positions: [
            {
              id: 2,
              name: "WR",
            },
            {
              id: 10,
              name: "EDGE",
            },
            {
              id: 13,
              name: "G",
            },
          ],
        },
      ],
    },
    {
      round: {
        id: 6,
        name: "Jaguars",
        adp: null,
        index: 6,
        logo: "https://api.nfldraftfanatics.com/media/jax.png",
      },
      id: 74,
      team_neads_info: [
        {
          id: 319,
          priority: "P3",
          created_at: "2022-11-01T07:32:16.729409Z",
          updated_at: "2023-02-26T16:20:15.407411Z",
          team_neads: {
            id: 74,
            created_at: "2022-11-01T07:32:16.721151Z",
            updated_at: "2023-02-26T16:20:15.406635Z",
            round: 6,
          },
          positions: [
            {
              id: 2,
              name: "WR",
            },
            {
              id: 9,
              name: "DT",
            },
            {
              id: 10,
              name: "EDGE",
            },
          ],
        },
        {
          id: 320,
          priority: "P6",
          created_at: "2022-11-01T07:32:16.760259Z",
          updated_at: "2023-02-26T16:20:15.410520Z",
          team_neads: {
            id: 74,
            created_at: "2022-11-01T07:32:16.721151Z",
            updated_at: "2023-02-26T16:20:15.406635Z",
            round: 6,
          },
          positions: [
            {
              id: 3,
              name: "TE",
            },
            {
              id: 5,
              name: "OT",
            },
            {
              id: 7,
              name: "CB",
            },
          ],
        },
        {
          id: 321,
          priority: "P10",
          created_at: "2022-11-01T07:32:16.782895Z",
          updated_at: "2023-02-26T16:20:15.413112Z",
          team_neads: {
            id: 74,
            created_at: "2022-11-01T07:32:16.721151Z",
            updated_at: "2023-02-26T16:20:15.406635Z",
            round: 6,
          },
          positions: [
            {
              id: 2,
              name: "WR",
            },
            {
              id: 8,
              name: "S",
            },
            {
              id: 11,
              name: "LB",
            },
            {
              id: 13,
              name: "G",
            },
          ],
        },
      ],
    },
  ],
  liveTeams: [],
};

const liveDraftSlice = createSlice({
  name: "liveDraft",
  initialState,
  reducers: {
    setMyLiveTeam: (state,{payload}) => {
      state.myLiveTeam = payload
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
  },
});

export const { resetLiveDraft, setMyLiveTeam } = liveDraftSlice.actions;

export const selectLiveDraft = (state) => state.liveDraft;

export default liveDraftSlice.reducer
