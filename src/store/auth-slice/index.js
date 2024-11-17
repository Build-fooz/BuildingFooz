
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// Base URL for API requests
const BASE_URL = "http://localhost:5000/api/auth";

// Thunk to sign up a new user
export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (formData) => {
    const response = await axios.post(`${BASE_URL}/signup`, formData, {
      withCredentials: true,
    });
    return response.data;
  }
);

// Thunk to log in a user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData) => {
    const response = await axios.post(`${BASE_URL}/login`, formData, {
      withCredentials: true,
    });
    return response.data;
  }
);

// Thunk to log out a user
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    const response = await axios.post(`${BASE_URL}/logout`, {}, {
      withCredentials: true,
    });
    return response.data;
  }
);

// Thunk to check authentication status
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.token; // Assuming token is stored in state.auth.token

    if (!token) {
      return rejectWithValue("No token found. Skipping authentication check.");
    }

    const config = {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Authorization: `Bearer ${token}`, // Include the token if available
      },
      withCredentials: true,
    };

    try {
      const response = await axios.get(`${BASE_URL}/check-auth`, config);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Invalid or expired token");
        return rejectWithValue("Unauthorized: Invalid or expired token");
      }
      throw error;
    }
  }
);



// Auth slice with initial state and reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
