import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {searchValue} = React.useContext(SearchContext);


  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sortType.sortProperty.replace("-", "");
  const search = searchValue ? `&search=${searchValue}` : "";

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63f9de89473885d837d40609.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          setCategoryId={(i) => setCategoryId(i)}
        />
        <Sort sortType={sortType} setSortType={(i) => setSortType(i)} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>

      <Pagination onChangePage={ (number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
