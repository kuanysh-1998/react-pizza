import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterSliceState, Sort, sortPropertyEnum } from "./types";


const initialState: filterSliceState = {
  searchValue: "",
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: sortPropertyEnum.RATING_DESC,
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<filterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
        state.categoryId = Number(action.payload.categoryId);
      } else {
        state.currentPage = 1;
        state.sort = {
          name: "популярности",
          sortProperty: sortPropertyEnum.RATING_DESC,
        };
        state.categoryId = 0;
      }
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});



export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
