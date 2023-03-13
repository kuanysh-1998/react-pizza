import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";

type currentPageProps = {
  currentPage: number;
};

const Pagination: React.FC<currentPageProps> = ({ currentPage }) => {
  const dispatch = useDispatch();

  const onChangePage: (page: number) => void = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        forcePage={currentPage - 1}
      />
    </>
  );
};

export default Pagination;
