import { ThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "@src/store";

export type ThunkActionType = ThunkAction<void, RootState, unknown, AnyAction>;
