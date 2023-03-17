export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  search: string;
  currentPage: number;
  categoryId: number;
};

export type Pizza = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: string;
  rating: number;
};
