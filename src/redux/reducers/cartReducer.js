import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const cartReducer = cartSlice.reducer;
export const actions = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer;
