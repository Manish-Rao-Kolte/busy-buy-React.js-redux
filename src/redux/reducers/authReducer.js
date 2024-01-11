import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const authReducer = authSlice.reducer;
export const actions = authSlice.actions;
export const authSelector = (state) => state.authReducer;
