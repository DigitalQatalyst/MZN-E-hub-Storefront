import styled from "styled-components";
import { space } from "styled-system";
import { getTheme } from "@utils/utils";

export const StyledPagination = styled.div`
  .pagination {
    margin: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    list-style-type: none;
    padding: 0;

    li {
      cursor: pointer;
      margin: 0 6px;

      &.previous,
      &.next {
        a {
          padding: 8px 12px;
          border-radius: 10px;
          background: #f2f2f4;
          color: #6b6b76;
          border: 1px solid transparent;
        }
      }

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 36px;
        min-width: 36px;
        padding: 0 12px;
        border-radius: 10px;
        outline: none;
        border: 1px solid #e6e6eb;
        background: #f7f7fa;
        color: #6b6b76;

        @media only screen and (max-width: 450px) {
          margin: 4px;
          font-size: 12px;
          height: 30px;
          min-width: 30px;
          padding: 0 8px;
        }
      }

      &:not(.active):hover {
        a {
          filter: brightness(0.98);
        }
      }
    }

    .active {
      cursor: default;
      a {
        background: ${getTheme("colors.primary.main")};
        border-color: ${getTheme("colors.primary.main")};
        color: white;
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06) inset;
      }
    }

    .disabled {
      a {
        opacity: 0.6;
        pointer-events: none;
      }
    }

    @media (max-width: 768px) {
      .pagination {
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 0;
      }

      li {
        margin: 5px 0;
      }
    }
  }

  ${space}
`;
