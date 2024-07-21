// src/store/reducers.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import cityReducer from '../slices/citySlice';

const rootReducer = combineReducers({
  auth: authReducer,
  city: cityReducer,
});

export default rootReducer;
