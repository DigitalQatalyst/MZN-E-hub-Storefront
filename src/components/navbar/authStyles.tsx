import { getTheme } from "@utils/utils";
import styled from "styled-components";

const StyledNavbar = styled.div`
  position: relative;
  height: 76px;
  background: var(--MZN-Gradient-Style, linear-gradient(90deg, #0030E3 0%, #0030E1 11.79%, #002EDC 21.38%, #002DD3 29.12%, #002AC8 35.34%, #0027BA 40.37%, #0024AA 44.56%, #002099 48.24%, #001C86 51.76%, #001872 55.44%, #00145E 59.63%, #00104A 64.66%, #000B36 70.88%, #000723 78.62%, #000411 88.21%, #000000 100%));

  backdrop-filter: blur(6px);
  box-shadow: ${getTheme("shadows.regular")};

  /* Navigation link styles */
  .nav-link {
    color: #333;
    font-family: "Helvetica Neue", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: #0030E3;
    }
  }

  /* Sign in button styles */
  .sign-in-btn {
    display: flex;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #0030E3;
    color: #0030E3;
    background: transparent;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(0, 48, 227, 0.1);
    }
  }

  /* Sign up button styles */
  .sign-up-button {
    display: flex;
    padding: 10px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    min-width: 100px;
    background: #0030E3;
    color: white;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease;
    
    &:hover {
      background: #0028CC;
    }
  }

  /* User Profile Photo Styles */
  .profile-photo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-initials {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 2px solid #e9ecef;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    font-weight: 600;
    font-size: 14px;
    font-family: "Helvetica Neue", sans-serif;
    transition: all 0.3s ease;

    &:hover {
      border-color: #0030E3;
      background-color: #f8f9fa;
      transform: scale(1.05);
    }
  }

  .nav-link:last-child {
    margin-right: 0px;
  }

  /* Dropdown menu styles */
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

  /* Dropdown Icon Style */
  .dropdown-icon {
    color: #0030E3;
    width: 12px;
    height: 24px;
    margin-left: 6px;
    transition: transform 0.3s ease;
  }

  /* Hover Effect for Dropdown Icon */
  .nav-link:hover .dropdown-icon {
    transform: rotate(180deg);
  }

  /* Mobile responsive styles */
  @media only screen and (max-width: 900px) {
    /* Reduce navbar height slightly on mobile for better screen real estate */
    height: 64px;
    
    /* Ensure navbar is always visible on mobile */
    display: block;
    
    /* Mobile logo adjustments */
    .navbar-logo {
      img {
        max-height: 32px;
        width: auto;
      }
    }
    
    /* Mobile profile photo adjustments */
    .profile-photo .profile-initials {
      width: 36px;
      height: 36px;
      font-size: 12px;
      border-width: 1px;
    }
  }

  /* Tablet responsive styles */
  @media only screen and (max-width: 1200px) and (min-width: 901px) {
    /* Adjust spacing for tablet views */
    .navbar-logo {
      margin-left: -40px;
    }
    
    /* Reduce right margin for tablet */
    .search-icon, .profile-photo {
      margin-right: -40px;
    }
  }

  /* Small mobile devices */
  @media only screen and (max-width: 480px) {
    height: 56px;
    
    .navbar-logo {
      margin-left: 8px !important;
      
      img {
        max-height: 28px;
      }
    }
    
    .profile-photo .profile-initials {
      width: 32px;
      height: 32px;
      font-size: 11px;
    }
  }

  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    /* Increase touch targets for mobile devices */
    .profile-photo,
    .search-icon {
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* Remove hover effects that don't work on touch devices */
    .profile-initials:hover {
      transform: none;
    }
  }
`;

export default StyledNavbar;