import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebaseInit";
import { getDoc, doc } from "firebase/firestore";

const initialState = {
  products: [],
};

export const getProductsAsync = createAsyncThunk(
  "products/getProductsAsync",
  async () => {
    const snap = await getDoc(doc(db, "products", "list"));
    return snap.data().data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsAsync.fulfilled, (state, action) => {
      state.products = [...action.payload];
    });
  },
});

export const productReducer = productSlice.reducer;
export const actions = productSlice.actions;
export const productSelector = (state) => state.productReducer;
