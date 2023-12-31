import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINT, PLAYER_MAX } from "../../../config/config";
import axiosInstance from "../../../service/axiosInstance";
import TokenService from "../../../service/token.service";
import { dateFormat, dateFormatNew, getCurrentNewDate, timeDiffCalc } from "../../../utils/utils";

export const getLiveTeams = createAsyncThunk(
  "liveDraft/getLiveTeams",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${API_ENDPOINT}draft/event_free_team/${id}`
      );

      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const joinEvent = createAsyncThunk(
  "liveDraft/joinEvent",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `${API_ENDPOINT}draft/join_event/`,
        data
      );

      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const liveEventsList = createAsyncThunk(
  "liveDraft/liveEventsList",

  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axiosInstance.get(`${API_ENDPOINT}event/`, config);
      return res.data.results;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getLiveDraftInfo = createAsyncThunk(
  "liveDraft/getLiveDraftInfo",

  async (id, { rejectWithValue, getState }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
   
      let myEventTeam = null;
      let nextMyEvent = false;
      const {
        liveDraft: {
          eventInfo,
          eventTime,
          eventStartTime,
          millisecondToMinute,
        },
      } = getState();
      const user = TokenService.getUser();

      const eventPlayerRes = await axiosInstance.get(
        `${API_ENDPOINT}event-player/?event_id=${id}&limit=${PLAYER_MAX}`,
        config
      );
      const recentPicks = await axios.get(
        `${API_ENDPOINT}live-value-history/?limit=1000&offset=0&round=&round_index_number=${7}&tm=`,
        config
      );

      const eventInfoPlayerId = eventInfo?.players.map((item) => item?.user.id);
      if (
        eventInfo.creator.id !== user.id ||
        eventInfoPlayerId.includes(user.id)
      ) {
        const myEventTeamRes = await axiosInstance.get(
          `${API_ENDPOINT}draft/event_team_needs/${id}`,
          config
        );

        myEventTeam = myEventTeamRes.data;
        nextMyEvent =
          myEventTeam.round.id === recentPicks.data?.results[0].round.id;
      }

      const picksTeams = await axios.get(`${API_ENDPOINT}team-neads/`, config);
      const picksTeamsResult = picksTeams.data?.results.map(
        (item) => item.round
      );
      
      const currentTime = eventTime - (eventStartTime * millisecondToMinute);
      return {
        eventPlayers: eventPlayerRes.data.results,
        myEventTeam:{...myEventTeam,user_id:user.id},
        recentPicks: recentPicks.data?.results,
        picksTeams: picksTeamsResult,
        nextMyEvent,
        eventTime: currentTime,

      };
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const liveEventsSession = createAsyncThunk(
  "liveDraft/liveEventsSession",

  async (sessionId, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axiosInstance.get(
        `${API_ENDPOINT}event/?search=${sessionId}`,
        config
      );
      const data = res.data.results[0];
      const startDate = dateFormat(data.date);
  
      const currentDate = getCurrentNewDate();
      
      const diffDate = timeDiffCalc(startDate, currentDate);
      if (diffDate.diffMinute === null) {
        return rejectWithValue(diffDate.message);
      }

      return {
        eventId: data.id,
        eventInfo: data,
        eventStartTime: diffDate.diffMinute,
      };
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const myLiveEventGet = createAsyncThunk(
  "liveDraft/myLiveEventGet",

  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axiosInstance.get(`${API_ENDPOINT}event/`, config);
      return res.data.results;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
