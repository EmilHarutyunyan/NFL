import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import TokenService from "../../../service/token.service"
import { API_ENDPOINT } from '../../../config/config'

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_ENDPOINT}token/`,
        { username, password },
      )

      // store user's token in local storage
      // localStorage.setItem('userToken', data.userToken)
      TokenService.setUser(res.data)

      return res.data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ first_name, last_name, username, password, twitter_link = "", profile_picture }, { rejectWithValue }) => {
    try {

      
      const res = await axios.post(
        `${API_ENDPOINT}users/`,
        { first_name, last_name, username, password, twitter_link, profile_picture },
        
      )
      TokenService.setUser(res.data)
      return res.data
    } catch (error) {
      console.log('error :', error);
      debugger
      if (error.response && error.response.data) {
        
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

// export const getUserDetails = createAsyncThunk(
//   'user/getUserDetails',
//   async (arg, { getState, rejectWithValue }) => {
//     try {
//       // get user data from store
//       const { user } = getState()

//       // configure authorization header with user's token
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.userToken}`,
//         },
//       }

//       const { data } = await axios.get(`/api/user/profile`, config)
//       return data
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )
