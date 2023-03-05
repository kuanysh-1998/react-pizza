import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";

const Pagination = ({ currentPage }) => {
  const dispatch = useDispatch();

  const onChangePage = (page) => {
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
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </>
  );
};

export default Pagination;
