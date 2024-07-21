import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import agent from '../utils/agent';
import { AxiosError } from 'axios';
import { City, CityList } from '../models/city';

export type TCity = {
  currentCity: City;
  cityList: CityList;
  totalCities: number;
  isFetching: boolean;
  isSending: boolean;
};

const initialState: TCity = {
  currentCity: {} as City,
  cityList: [],
  totalCities: 0,
  isFetching: false,
  isSending: false,
};

export const getCities: AsyncThunk<any, void, Record<string, never>> = createAsyncThunk(
  'city/fetch/getAllCities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await agent.Cities.getCities();
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

export const getTotalCities: AsyncThunk<any, void, Record<string, never>> = createAsyncThunk(
  'city/fetch/getTotalCities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await agent.Cities.getCities();
      return response.length; // Trả về tổng số lượng thành phố
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

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCityList: (state, action) => {
      state.cityList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCities.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getCities.fulfilled, (state, action) => {
      state.isFetching = false;
      state.cityList = action.payload;
    });
    builder.addCase(getCities.rejected, (state) => {
      state.isFetching = false;
    });
    builder.addCase(getTotalCities.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getTotalCities.fulfilled, (state, action) => {
      state.isFetching = false;
      state.totalCities = action.payload;
    });
    builder.addCase(getTotalCities.rejected, (state) => {
      state.isFetching = false;
    });
  },
});

export const { setCurrentCity, setCityList } = citySlice.actions;
export default citySlice.reducer;
