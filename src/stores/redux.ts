import dndSlice from "@/features/dndSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as originalUseDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    dnd: dndSlice,
  },
});

export type TAppDispatch = typeof store.dispatch;
export const useDispatch = (): TAppDispatch =>
  originalUseDispatch<TAppDispatch>();

export type TRootState = ReturnType<typeof store.getState>;
