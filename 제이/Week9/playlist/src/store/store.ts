// 저장소 생성
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,   // cartSlice reducer 등록
  },
});

// RootState / AppDispatch 타입 자동 생성
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
