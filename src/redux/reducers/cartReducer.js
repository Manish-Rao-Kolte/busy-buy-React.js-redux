import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebaseInit";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { createOrderAsync } from "./orderReducer";

const initialState = {
  cart: [],
  cartTotal: 0,
};

export const getCartAsync = createAsyncThunk(
  "cart/getCartAsync",
  async (payload) => {
    if (payload) {
      const docRef = doc(db, "usersCarts", payload.uid, "myCart", "cart");
      const data = (await getDoc(docRef)).data();
      return { list: data.list, cartTotal: data.cartTotal };
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (payload) => {
    const docRef = doc(db, "usersCarts", payload.user.uid, "myCart", "cart");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docList = [...docSnap.data().list];
      const index = docList.findIndex((doc) => doc.prod.id === payload.prod.id);
      if (index === -1) {
        docList.push({ qty: 1, prod: payload.prod });
      } else {
        docList[index] = { qty: docList[index].qty + 1, prod: payload.prod };
      }
      await updateDoc(docRef, {
        list: [...docList],
        cartTotal: docSnap.data().cartTotal + payload.prod.price,
      });
    } else {
      await setDoc(docRef, {
        list: [{ qty: 1, prod: payload.prod }],
        cartTotal: payload.prod.price,
      });
    }
    return (await getDoc(docRef)).data();
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (payload) => {
    const docRef = doc(db, "usersCarts", payload.user.uid, "myCart", "cart");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docList = docSnap
        .data()
        .list.filter((doc) => doc.prod.id !== payload.prod.id);
      await updateDoc(docRef, {
        list: [...docList],
        cartTotal: docSnap.data().cartTotal - payload.prod.price,
      });
      return (await getDoc(docRef)).data();
    }
  }
);

export const increaseCartQtyAsync = createAsyncThunk(
  "cart/increaseCartQtyAsync",
  async (payload) => {
    const docRef = doc(db, "usersCarts", payload.user.uid, "myCart", "cart");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docList = [...docSnap.data().list];
      docList.map((doc) => {
        if (doc.prod.id === payload.prod.id) {
          doc.qty += 1;
        }
        return doc;
      });
      await updateDoc(docRef, {
        list: [...docList],
        cartTotal: docSnap.data().cartTotal + payload.prod.price,
      });
      return (await getDoc(docRef)).data();
    }
  }
);

export const decreaseCartQtyAsync = createAsyncThunk(
  "cart/decreaseCartQtyAsync",
  async (payload) => {
    const docRef = doc(db, "usersCarts", payload.user.uid, "myCart", "cart");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docList = [...docSnap.data().list];
      const index = docList.findIndex((doc) => doc.prod.id === payload.prod.id);
      if (docList[index].qty <= 1) {
        docList.splice(index, 1);
      } else {
        docList[index].qty -= 1;
      }
      await updateDoc(docRef, {
        list: [...docList],
        cartTotal: docSnap.data().cartTotal - payload.prod.price,
      });
      return (await getDoc(docRef)).data();
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.cart = [...action.payload.list];
        state.cartTotal = action.payload.cartTotal;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.cart = [...action.payload.list];
        state.cartTotal = action.payload.cartTotal;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.cart = [...action.payload.list];
        state.cartTotal = action.payload.cartTotal;
      })
      .addCase(increaseCartQtyAsync.fulfilled, (state, action) => {
        state.cart = [...action.payload.list];
        state.cartTotal = action.payload.cartTotal;
      })
      .addCase(decreaseCartQtyAsync.fulfilled, (state, action) => {
        state.cart = [...action.payload.list];
        state.cartTotal = action.payload.cartTotal;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.cart = [];
        state.cartTotal = 0;
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const actions = cartSlice.actions;
export const cartSelector = (state) => state.cartReducer;
