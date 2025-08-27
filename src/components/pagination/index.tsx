"use client";

import ReactPaginate from "react-paginate";
import { SpaceProps } from "styled-system";

import { StyledPagination } from "./styled";

// ==============================================================
export interface PaginationProps extends SpaceProps {
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  onChange?: (data: number) => void;
}
// ==============================================================

export default function Pagination({
  onChange,
  pageCount,
  pageRangeDisplayed,
  marginPagesDisplayed,
  ...props
}: PaginationProps) {
  const handlePageChange = async (page: any) => {
    if (onChange) onChange(page.selected);
  };

  const PREVIOUS_BUTTON = (
    <>Previous</>
  );

  const NEXT_BUTTON = (
    <>Next</>
  );

  const BREAK_LABEL = "…";

  return (
    <StyledPagination {...props}>
      <ReactPaginate
        pageCount={pageCount}
        nextLabel={NEXT_BUTTON}
        breakLabel={BREAK_LABEL}
        activeClassName="active"
        disabledClassName="disabled"
        containerClassName="pagination"
        previousLabel={PREVIOUS_BUTTON}
        onPageChange={handlePageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
      // subContainerClassName="pages pagination"
      />
    </StyledPagination>
  );
}
