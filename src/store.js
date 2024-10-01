import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './store/dataSlice'; // Ganti dengan reducer yang kamu miliki

const store = configureStore({
  reducer: {
    data: dataReducer, // Pastikan ini sesuai dengan reducer yang ada
  },
});

export default store;
