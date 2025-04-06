import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

axios.defaults.withCredentials = true; // To handle cookie automatically

export const isUserAuthenticated = createAsyncThunk(
  "user/isAuthenticated", 
  async(_, { rejectedWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/isAuthenticated`);
      return response.data; //Return user details if authenticated
    } catch (error) {
      return rejectedWithValue(error.response?.data || "Authentication Failed")
    }
  }
)

const initialState = {
  error: null,
  isLoading: false,
  isEmailVerified: false,
  isAuthenticated: false,
  userDetails: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setEmailVerified: (state) => {
      state.isEmailVerified = true;
    },
    logoutStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.error = false;
      state.isAuthenticated = false;
      state.userDetails = null;
    },
    logoutFail: (state) => {
      state.isLoading = false;
      state.error = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(isUserAuthenticated.fulfilled, (state, action) => {
        state.isAuthenticated = true,
        state.userDetails = action.payload
      })

      .addCase(isUserAuthenticated.rejected, (state) => {
        state.isAuthenticated = false;
        state.userDetails = null;
      })
  }
});

export const { loginStart, loginSuccess, loginFail, setEmailVerified, logoutStart, logoutSuccess, logoutFail } =
  userSlice.actions;

export default userSlice.reducer;
