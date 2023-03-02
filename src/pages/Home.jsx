import React, { useRef } from "react";
import axios from "axios";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort, { sortList } from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../components/redux/slices/filterSlice";
import qs from "qs";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const { categoryId, sort, currentPage, setFilters } = useSelector(
    (state) => state.filterSlice
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = React.useCallback((idx) => {
    dispatch(setCategoryId(idx));
  }, []);

  const fetchPizzas = () => {
    setIsLoading(true);
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://63f9de89473885d837d40609.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={onChangeCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>

      <Pagination currentPage={currentPage} />
    </div>
  );
};

export default Home;
