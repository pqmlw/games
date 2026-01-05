import { configureStore } from "@reduxjs/toolkit";
import sharedSlice from "./shared.slice";

const store = configureStore({
  reducer: {
    shared: sharedSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
