import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebaseInit";

const initialState = {
  user: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUserAsync",
  async (payload) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: payload.name,
    });
    return user;
  }
);

export const signinUserAsync = createAsyncThunk(
  "auth/signinUserAsync",
  async (payload) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    return userCredential.user;
  }
);

export const signoutUserAsync = createAsyncThunk(
  "auth/signoutUserAsync",
  async () => {
    await signOut(auth);
    return;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setInitialUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signinUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signoutUserAsync.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { setInitialUser } = authSlice.actions;
export const authSelector = (state) => state.authReducer;
