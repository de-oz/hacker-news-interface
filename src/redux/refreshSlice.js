import { createSlice } from "@reduxjs/toolkit";

export const refreshSlice = createSlice({
  name: "refresh",
  initialState: {
    intervalId: undefined,
  },
  reducers: {
    setIntervalId: (state, action) => {
      state.intervalId = action.payload;
    },
    stopInterval: (state) => {
      clearInterval(state.intervalId);
      state.intervalId = undefined;
    },
  },
});

export const { setIntervalId, stopInterval } = refreshSlice.actions;

export default refreshSlice.reducer;
