import { getTheme } from "@utils/utils";
import styled from "styled-components";

const StyledNavbar = styled.div`
  position: relative;
  height: 60px;
  background: var(--MZN-Gradient-Style, linear-gradient(90deg, 
    #01E5D1 0%, #02E4D1 8.12%, #04E2D2 14.47%, #07DFD3 19.42%, 
    #0CDAD5 23.32%, #12D5D7 26.54%, #18CEDA 29.42%, #20C7DD 32.34%, 
    #29BEE0 35.66%, #33B5E4 39.72%, #3DABE8 44.89%, #48A0EC 51.54%, 
    #5395F1 60.01%, #6089F5 70.67%, #6C7DFA 83.88%, #7970FF 100%));
  
  backdrop-filter: blur(6px);
  box-shadow: ${getTheme("shadows.regular")};

  .nav-link {
    color: #FFF;
    font-family: "Helvetica Neue", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
    cursor: pointer;
    transition: color 0.3s ease;

    // // &:hover {
    // //   color: ${getTheme("colors.primary.main")};
    // // }
  }

  .sign-in-btn {
    display: flex;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #fff; /* Adjust border color if needed */
    color: #fff; /* Text color */
    background: transparent; /* Transparent background */
    transition: all 0.3s ease;

    // // &:hover {
    // //   background: rgba(255, 255, 255, 0.2); /* Light hover effect */
    // // }
  }

  .sign-up-button {
  display: flex;
  padding: 10px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  /* Prevent text from wrapping */
  white-space: nowrap;

  /* Adjust width so the text fits properly */
  min-width: 100px;

  background: white;
  color: blue;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

}



  .nav-link:last-child {
    margin-right: 0px;
  }

  .root-child {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 5;
  }
  .root:hover {
    .root-child {
      display: block;
    }
  }

  .child {
    display: none;
    position: absolute;
    top: 0;
    left: 100%;
    z-index: 5;
  }
  .parent:hover > .child {
    display: block;
  }

  .dropdown-icon {
    color: ${getTheme("colors.text.muted")};
  }
  @media only screen and (max-width: 900px) {
    display: none;
  }

  /* Dropdown Icon Style */
  .dropdown-icon {
    width: 12px;  /* Adjust width based on your icon size */
    height: auto;
    margin-left: 6px;  /* Adds space between the text and the icon */
    transition: transform 0.3s ease;  /* Optional: Adds smooth transition effect */
  }

  /* Hover Effect for Dropdown Icon */
  .nav-link:hover .dropdown-icon {
    transform: rotate(180deg);  /* Optional: Adds rotation effect on hover */
  }
`;

export default StyledNavbar;
