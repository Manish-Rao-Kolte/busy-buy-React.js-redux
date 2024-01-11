import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const orderReducer = orderSlice.reducer;
export const actions = orderSlice.actions;
export const orderSelector = (state) => state.orderReducer;
