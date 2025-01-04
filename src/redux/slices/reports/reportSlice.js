import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
  name: "reports",
  initialState: {
    stateResult: {},
  },
  reducers: {
    setStateResult:(state, action) => {
      state.stateResult = action.payload
    }
  },
});

export const { setStateResult } = reportSlice.actions;
