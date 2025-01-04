import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    Access: {},
  },
  reducers: {
    setLoginAuth:(state, action) => {
      state.Access = action.payload
    },
    setLogout: (state) => {
      state = {
        Access: {},
      }
    },
    setToken: (state, action) => {
      state.Access.token = action.payload.token
    }
  },
});

export const { setLoginAuth, setToken, setLogout } = authSlice.actions;
