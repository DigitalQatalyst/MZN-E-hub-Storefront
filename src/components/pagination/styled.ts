import styled from "styled-components";
import { space } from "styled-system";
import { getTheme } from "@utils/utils";

export const StyledPagination = styled.div`
  .pagination {
    margin: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    list-style-type: none;
    padding: 0px;

    li {
      cursor: pointer;
      margin: 0 6px;
      &.previous, &.next {
        a {
          padding: 8px 12px;
          border-radius: 10px;
          background: #F2F2F4;
          color: #6B6B76;
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
        border: 1px solid #E6E6EB;
        background: #F7F7FA;
        color: #6B6B76;
        @media only screen and (max-width: 450px) {
          margin: 4px;
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
        box-shadow: 0 1px 0 rgba(0,0,0,0.06) inset;
      }
    }

    .disabled {
      a {
        opacity: 0.6;
        pointer-events: none;
      }
    }
  }

  ${space}
`;
