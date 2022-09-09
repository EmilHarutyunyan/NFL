import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/user/userSlice"
import playersReducer from "./features/players/playersSlice"
import groupReducer from './features/group/groupSlice';
export const store = configureStore({
  reducer: {
    user:userReducer,
    players: playersReducer,
    group:groupReducer
  },
});
