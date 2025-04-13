import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/axiosConfig.js";

export const authState = createAsyncThunk(
  "user/authState",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/isAuthenticated");
      return response.data; // ✅ set user details if authenticated
    } catch (error) {
      return rejectWithValue(error.response?.data || "Authentication Failed");
    }
  }
);


const initialState = {
  error: null,
  isLoading: false,
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
    resetLoadingstate: (state) => {
      setLoadingState(state, false);
    },
    apiRequestStart: (state) => setLoadingState(state),
    apiRequestFail: (state, action) => {
      setLoadingState(state, false, action.payload);
    },
    apiRequestSuccess: (state, action) => {
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
      .addCase(authState.fulfilled, (state, action) => {
        // ✅ Prevents re-updating the state
        state.isAuthenticated = !!action.payload || true;
        state.userDetails = action.payload;
      })

      .addCase(authState.rejected, (state) => {
        state.isAuthenticated = false;
        state.userDetails = null;
      })

  },
});

export const {
  apiRequestStart,
  apiRequestSuccess,
  apiRequestFail,
  logoutSuccess,
  resetLoadingstate,
} = userSlice.actions;

export default userSlice.reducer;
