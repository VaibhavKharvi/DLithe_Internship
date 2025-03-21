// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0; // Reset the count to zero
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions; // Include reset action
export const selectCount = (state) => state.counter.value;
export default counterSlice.reducer;
