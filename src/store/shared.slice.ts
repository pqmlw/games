import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { SliceShared } from "@src/typings/shared";

const initialState: SliceShared = {
  isAuth: false,
  loadingInitial: false,
};

const sharedSlice = createSlice({
  initialState,
  name: "slice-shared",
  reducers: {
    setLoadingInitial(state, action: PayloadAction<boolean>) {
      state.loadingInitial = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setLoadingInitial, setIsAuth } = sharedSlice.actions;

export default sharedSlice;
