import { RootState } from "../../store";
export const SelectFilter = (state: RootState) => state.filterSlice;
export const SelectSort = (state: RootState) => state.filterSlice.sort;