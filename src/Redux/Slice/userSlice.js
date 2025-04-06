import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

axios.defaults.withCredentials = true; // To handle cookie automatically

export const isAuthenticated = createAsyncThunk(
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(isAuthenticated.fulfilled, (state, action) => {
        state.isAuthenticated = true,
        state.userDetails = action.payload
      })

      .addCase(isAuthenticated.rejected, (state) => {
        state.isAuthenticated = false;
        state.userDetails = null;
      })
  }
});

export const { loginStart, loginSuccess, loginFail, setEmailVerified } =
  userSlice.actions;

export default userSlice.reducer;
