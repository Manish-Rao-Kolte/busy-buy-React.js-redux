import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebaseInit";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";

const initialState = {
  orders: [],
};

const findDate = async () => {
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yy = date.getFullYear();
  return `${yy}-${mm}-${dd}`;
};

export const getOrdersAsync = createAsyncThunk(
  "orders/getOrdersAsync",
  async (payload) => {
    if (payload) {
      const docRef = doc(db, "usersOrders", payload.uid, "myOrders", "orders");
      const docSnap = await getDoc(docRef);
      return docSnap.data().list;
    }
  }
);

export const createOrderAsync = createAsyncThunk(
  "orders/createOrderAsync",
  async (payload) => {
    const date = await findDate();
    const docRef = doc(
      db,
      "usersOrders",
      payload.user.uid,
      "myOrders",
      "orders"
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        list: [
          {
            orderDate: date,
            order: payload.cart,
            orderTotal: payload.cartTotal,
          },
          ...docSnap.data().list,
        ],
      });
    } else {
      await setDoc(docRef, {
        list: [
          {
            orderDate: date,
            order: payload.cart,
            orderTotal: payload.cartTotal,
          },
        ],
      });
    }
    const cartRef = doc(db, "usersCarts", payload.user.uid, "myCart", "cart");
    await updateDoc(cartRef, {
      list: [],
      cartTotal: 0,
    });
    return (await getDoc(docRef)).data().list;
  }
);

export const deleteOrderAsync = createAsyncThunk(
  "orders/deleteOrderAsync",
  async (payload) => {
    const docRef = doc(
      db,
      "usersOrders",
      payload.user.uid,
      "myOrders",
      "orders"
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const orderList = [...docSnap.data().list];
      orderList.splice(payload.index, 1);
      await updateDoc(docRef, {
        list: [...orderList],
      });
      return (await getDoc(docRef)).data().list;
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.orders = [...action.payload];
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.orders = [...action.payload];
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.orders = [...action.payload];
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const actions = orderSlice.actions;
export const orderSelector = (state) => state.orderReducer;
