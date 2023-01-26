import { createSlice } from '@reduxjs/toolkit'
import { getUserDetails, registerUser, userLogin } from './userActions'
import TokenService from "../../../service/token.service"
// initialize userToken from local storage

const userToken = TokenService.getLocalAccessToken() || null
const userInfo = TokenService.getUser() || null

const initialState = {
  loading: false,
  userInfo,
  userToken,
  error: null,
  success: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      TokenService.removeUser(); // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
      state.success = false
      
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {

      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false
      // state.userInfo = payload
      // state.userToken = payload.userToken
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false
      state.success = true // registration successful
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
      
    }
  },
})

export const { logout } = userSlice.actions

export const selectUser = (state) => state.user;

export default userSlice.reducer

// {
//   "id": "1a24c8e1-d061-4643-a2f0-bfbfc049d942",
//     "first_name": "Oren",
//       "last_name": "Burch",
//         "username": "jibesi@gm.com",
//           "twitter_link": "Unde deserunt et par",
//             "tokens": {
//     "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY3NDgyMTc2NCwianRpIjoiMzExYjU0NTI3N2QxNDRjM2JkMjA4ZDQ1NGQyOGUyMWQiLCJ1c2VyX2lkIjoiMWEyNGM4ZTEtZDA2MS00NjQzLWEyZjAtYmZiZmMwNDlkOTQyIn0.NsyAhzvcgWpQOZmc3yK6C9dMf1G_vGAxkQGDRDzMxH4",
//       "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc0NzM4OTY0LCJqdGkiOiI3MTgzMTlmMTUwNDQ0MzUwYjMwZWU5NzI0ZjM4NTVmNCIsInVzZXJfaWQiOiIxYTI0YzhlMS1kMDYxLTQ2NDMtYTJmMC1iZmJmYzA0OWQ5NDIifQ.8pD0piYv0H-CtewdDYkR4sHOTATNvc9ROTXYg-3oXB0"
//   },
//   "profile_picture": null
// }