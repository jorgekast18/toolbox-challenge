import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import carouselsReducer from './carouselsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    carousels: carouselsReducer,
  },
});
