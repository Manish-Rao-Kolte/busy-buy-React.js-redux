import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const productReducer = productSlice.reducer;
export const actions = productSlice.actions;
export const productSelector = (state) => state.productReducer;
