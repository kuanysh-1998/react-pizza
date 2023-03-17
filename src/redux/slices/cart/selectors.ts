import { RootState } from "../../store";

export const SelectCart = (state: RootState) => state.cartSlice;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);