import { createSlice } from "@reduxjs/toolkit"; 
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Lp } from "../../types/cart";
import cartItems from "../../constants/cartItems";

interface CartState {
  items: Lp[];
}

const initialState: CartState = {
  items: cartItems, // 음반 mock 데이터
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.amount += 1;
    },
    decrease: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.amount > 1) item.amount -= 1;
    },
  },
});

export const { increase, decrease } = cartSlice.actions;

export default cartSlice.reducer;
