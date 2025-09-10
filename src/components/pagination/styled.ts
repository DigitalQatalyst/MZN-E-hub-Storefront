import styled from "styled-components";

export const StyledPagination = styled.div`
  .ede-pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  /* shared link button look */
  .ede-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    min-width: 36px;
    padding: 0 8px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
    text-decoration: none;
    user-select: none;
    cursor: pointer;
    border: 1px solid rgba(17, 17, 19, 0.16);
    background: #f3f4f6;
    color: #111113;
    transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
  }

  /* page numbers */
  .ede-page .ede-link:hover {
    background: #e5e7eb;
    border-color: rgba(17, 17, 19, 0.24);
  }

  /* active page – blue filled */
  .is-active .ede-link {
    background: #0030e3;
    border-color: #0030e3;
    color: #fff;
  }
  .is-active .ede-link:hover {
    background: #1e40af;
    border-color: #1e40af;
  }

  /* Previous / Next chips (wider) */
  .ede-prev .ede-link,
  .ede-next .ede-link {
    min-width: 90px;
    padding: 0 12px;
    font-weight: 500;
  }

  /* disabled Previous/Next */
  .is-disabled .ede-link {
    background: rgba(17, 17, 19, 0.04);
    border-color: rgba(17, 17, 19, 0.08);
    color: #9ca3af;
    cursor: default;
    pointer-events: none;
  }

  /* break (ellipsis) */
  .ede-break .ede-link {
    background: transparent;
    border: none;
    color: #6b7280;
    min-width: 16px;
    padding: 0 4px;
    cursor: default;
  }
`;
