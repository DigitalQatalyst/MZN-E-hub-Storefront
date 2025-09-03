"use client";

import ReactPaginate from "react-paginate";
import { SpaceProps } from "styled-system";
import { StyledPagination } from "./styled";

export interface PaginationProps extends SpaceProps {
  pageCount: number;
  /** optional controlled 0-based page */
  page?: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  onChange?: (pageIndex0: number) => void;
}

export default function Pagination({
  onChange,
  pageCount,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 1,
  page, // optional controlled page
  ...props
}: PaginationProps) {
  const handlePageChange = (evt: { selected: number }) => {
    onChange?.(evt.selected);
  };

  return (
    <StyledPagination {...props}>
      <ReactPaginate
        pageCount={pageCount}
        forcePage={typeof page === "number" ? page : undefined}
        onPageChange={handlePageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
        breakLabel="…"
        previousLabel="Previous"
        nextLabel="Next"

        // --- classes used by StyledPagination ---
        containerClassName="ede-pagination"
        pageClassName="ede-page"
        pageLinkClassName="ede-link"
        previousClassName="ede-prev"
        previousLinkClassName="ede-link"
        nextClassName="ede-next"
        nextLinkClassName="ede-link"
        breakClassName="ede-break"
        breakLinkClassName="ede-link"
        activeClassName="is-active"
        disabledClassName="is-disabled"
      />
    </StyledPagination>
  );
}
