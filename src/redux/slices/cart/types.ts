export type CartItem = {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  price: number;
  size: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
