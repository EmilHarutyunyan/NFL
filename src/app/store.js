import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/user/userSlice"
import playersReducer from "./features/players/playersSlice"
import groupReducer from './features/group/groupSlice';
import draftConfigReducer from "./features/draftConfig/draftConfigSlice"
export const store = configureStore({
  reducer: {
    user:userReducer,
    players: playersReducer,
    group:groupReducer,
    draftCongif: draftConfigReducer
  },
});
