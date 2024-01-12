import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingTrue: (state, action) => {
      state.loading = true;
    },
    setLoadingFalse: (state, action) => {
      state.loading = false;
    },
  },
});

export const loadingReducer = loadingSlice.reducer;
export const { setLoadingTrue, setLoadingFalse } = loadingSlice.actions;

export const loadingSelector = (state) => state.loadingReducer;
