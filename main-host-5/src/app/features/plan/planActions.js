import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../service/axiosInstance';
import { API_PLAN } from '../../../config/config';

export const planPost = createAsyncThunk(
  "plans/get",

  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_PLAN}plans/`
      );
      

      return data.results;

      
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createPayment = createAsyncThunk(
  "createPayment/post",

  async (paymentDetails, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `${API_PLAN}plans/create-payment/`,
        paymentDetails
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const executePayment = createAsyncThunk(
  "executePayment/post",

  async (paymentId, { rejectWithValue }) => {
    try {
  
      const response = await axiosInstance.post(
        `${API_PLAN}plans/confirm-payment-intent/`,
        paymentId
      );

      if(response.status === 400) {
        return false
      }
      return true
      
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);