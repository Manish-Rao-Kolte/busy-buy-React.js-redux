import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
import { productReducer } from "./reducers/productReducer";
import { loadingReducer } from "./reducers/loadingReducer";

export const store = configureStore({
  reducer: {
    authReducer,
    productReducer,
    cartReducer,
    orderReducer,
    loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([]),
});
