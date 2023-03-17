import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async ({
    order,
    sortBy,
    search,
    currentPage,
    categoryId,
  }: SearchPizzaParams) => {
    const { data } = await axios.get<Pizza[]>(
      `https://63f9de89473885d837d40609.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

interface pizzasSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState: pizzasSliceState = {
  items: [],
  status: "loading",
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});



export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
