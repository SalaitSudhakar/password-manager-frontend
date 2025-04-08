import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/axiosConfig.js";

export const isUserAuthenticated = createAsyncThunk(
  "user/isAuthenticated",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await api.get("/auth/isAuthenticated");
      return response.data; //Return user details if authenticated
    } catch (error) {
      return rejectedWithValue(error.response?.data || "Authentication Failed");
    }
  }
);

const initialState = {
  error: null,
  isLoading: false,
  isEmailVerified: false,
  isAuthenticated: false,
  userDetails: null,
};

// Reusable function to update loading & error state
const setLoadingState = (state, isLoading = true, error = null) => {
  state.isLoading = isLoading;
  state.error = error;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmailVerified: (state) => {
      state.isEmailVerified = true;
    },
    apiRequestStart: (state) => setLoadingState(state),
    apiRequestFail: (state, action) => {
      setLoadingState(
        state,
        false,
        action.payload?.error || "Something Went Wrong"
      );
    },
    apiRequestSuccess: (state, action) => {
      console.log(action);
      state.userDetails = action.payload;
      setLoadingState(state, false);
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.userDetails = null;
      setLoadingState(state, false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(isUserAuthenticated.fulfilled, (state, action) => {
        (state.isAuthenticated = true), (state.userDetails = action.payload);
      })

      .addCase(isUserAuthenticated.rejected, (state) => {
        state.isAuthenticated = false;
        state.userDetails = null;
      });
  },
});

export const {
  setEmailVerified,
  apiRequestStart,
  apiRequestSuccess,
  apiRequestFail,
  logoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
