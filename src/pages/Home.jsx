import React from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort, { sortList } from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setSearchValue } from "../redux/slices/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../redux/slices/pizzasSlice";

const Home = () => {
  const { categoryId, sort, currentPage, setFilters, searchValue } = useSelector(
    (state) => state.filterSlice
  );

  const { items, status } = useSelector((state) => state.pizzasSlice);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isMounted = React.useRef(false);



  const onChangeCategory = React.useCallback((idx) => {
    dispatch(setCategoryId(idx));
  }, []);

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        search,
        currentPage,
        categoryId,
      })
    );

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
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={onChangeCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      )}

      <Pagination currentPage={currentPage} />
    </div>
  );
};

export default Home;
