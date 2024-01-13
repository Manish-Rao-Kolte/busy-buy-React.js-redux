import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
  filterRange: 1000,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilterRange: (state, action) => {
      state.filterRange = action.payload;
    },
    priceFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload.filter(
        (prod) => prod.price <= state.filterRange
      );
    },
    textFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload.products.filter((prod) =>
        prod.title
          .toLowerCase()
          .includes(action.payload.searchText.toLowerCase())
      );
    },
    boxFilteredProducts: (state, action) => {
      const { isChecked, products, value } = action.payload;
      if (isChecked) {
        const data = products.filter(
          (prod) => prod.category.toLowerCase() === value.toLowerCase()
        );
        state.filteredProducts = [...state.filteredProducts, ...data];
      } else {
        state.filteredProducts = [
          ...state.filteredProducts.filter(
            (prod) => prod.category.toLowerCase() !== value.toLowerCase()
          ),
        ];
      }
    },
  },
  extraReducers: (builder) => {},
});

export const filterReducer = filterSlice.reducer;
export const {
  changeFilterRange,
  priceFilteredProducts,
  textFilteredProducts,
  boxFilteredProducts,
} = filterSlice.actions;

export const filterSelector = (state) => state.filterReducer;
