import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import agent from '../utils/agent';
import { AxiosError } from 'axios';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isFetching: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isFetching: false,
  error: null,
};

export const login: AsyncThunk<any, { email: string; password: string }, Record<string, never>> = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await agent.Auth.login(credentials);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const verifyOtp: AsyncThunk<any, { email: string; code: string }, Record<string, never>> = createAsyncThunk(
  'auth/verifyOtp',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await agent.Auth.verifyOtp(credentials);
      // Lưu trữ token vào local storage
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const refreshAuthToken: AsyncThunk<any, { refreshToken: string }, Record<string, never>> = createAsyncThunk(
  'auth/refreshToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await agent.Auth.refreshToken(token);
      // Lưu trữ token vào local storage
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      // Xóa token khỏi local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isFetching = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as string;
    });
    builder.addCase(verifyOtp.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.isFetching = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as string;
    });
    builder.addCase(refreshAuthToken.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(refreshAuthToken.fulfilled, (state, action) => {
      state.isFetching = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(refreshAuthToken.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
