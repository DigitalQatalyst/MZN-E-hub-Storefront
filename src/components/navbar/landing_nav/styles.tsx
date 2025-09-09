import styled from "styled-components";

export const StyledNavbar = styled.div`
  background: transparent !important;
  backdrop-filter: none;
  box-shadow: none;
  border-bottom: none;
  position: relative;
  z-index: 1000;

  .navbar-container {
    max-width: none;
    margin: 0;
    padding: 10px 54px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .enterprise-logo {
    font-family: "Open Sans", sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: white;
    text-decoration: none;
    letter-spacing: -0.5px;
    line-height: 1.2;
    text-transform: uppercase;
    padding-right: 10px;

    img {
      width: 110.382px;
      height: 32.003px;
    }

    .enterprise-text {
      display: block;
      font-size: 20px;
    }

    .journey-text {
      display: block;
      font-size: 16px;
      font-weight: 600;
      margin-top: -2px;
    }
  }

  .explore-button {
    background: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 0 16px;
    min-width: 278px;
    height: 34.409px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    @media (max-width: 768px) {
      display: none;
    }
  }

  .nav-links {
    gap: 20px;
    display: flex;
    align-items: center;
  }

  .right-section {
    gap: 20px;
    align-items: center;
    display: flex;
  }

  .search-icon {
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .profile-icon {
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .hamburger-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: transform 0.3s ease;
    display: none;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: linear-gradient(224.55deg, #7693F3 0.02%, #7693F3 11.72%, #7693F1 21.24%, #7594EF 28.92%, #7594EC 35.08%, #7495E9 40.08%, #7496E5 44.24%, #7397E0 47.89%, #7298DC 51.38%, #7299D7 55.03%, #719AD2 59.19%, #709BCD 64.18%, #6F9CC8 70.35%, #6E9DC3 78.03%, #6E9EBE 87.54%, #6D9FBA 99.24%);
    padding: 20px;
    z-index: 1001;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;

    &.open {
      transform: translateX(0);
    }

    .mobile-nav-links {
      flex-direction: column;
      gap: 20px;
      margin-top: 40px;
      justify-content: flex-start;
      align-items: flex-start;

      .nav-link {
        color: #FFF !important;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
        padding: 10px 0;
      }
    }

    .mobile-right-section {
      flex-direction: column;
      margin-top: 20px;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 20px;

      .profile-icon {
        width: 44px;
        height: 30px;
      }

      .search-icon {
        width: 44px;
        height: 30px;
      }
    }

    .mobile-explore-button {
      width: 100%;
      justify-content: flex-start;
      margin-top: 20px;
    }
  }

  .become-partner-btn {
    background: transparent !important;
    border: 2px solid rgba(255, 255, 255, 0.8) !important;
    color: #FFF !important;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    padding: 10px 24px;
    border-radius: 8px;
    transition: all 0.3s ease;
    min-width: 140px;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      transform: translateY(-2px);
    }
  }

  .sign-up-btn {
    background: white !important;
    color: #0000FF !important;
    border: 2px solid white !important;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 8px;
    min-width: 100px;
    cursor: pointer;

    &:hover {
      background: #f0f0f0 !important;
    }
  }

  .mobile-auth-button.become-partner-btn {
    background: transparent !important;
    color: #FFF !important;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 6px;
  }

  .responsive-mobile-menu {
    display: none;
  }

  .mobile-nav-links {
    gap: 10px;
    width: 100%;
    justify-content: space-around;

    .nav-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      color: #002180;
      text-decoration: none;
      cursor: pointer;

      img {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
    }
  }

  .dropdown-icon {
    margin-top: 2px;
  }

  // Tablet screens
  @media (max-width: 1024px) {
    .navbar-container {
      padding: 16px 40px;
    }

    .enterprise-logo {
      font-size: 20px;

      img {
        width: 110.382px;
        height: 32.003px;
      }

      .enterprise-text {
        font-size: 18px;
      }

      .journey-text {
        font-size: 14px;
      }
    }

    .nav-links {
      gap: 10px;
    }

    .explore-button {
      min-width: 120px;
      height: 40px;

      .explore-text {
        font-size: 14px;
      }
    }

    .become-partner-btn {
      min-width: 120px;
      font-size: 14px;
      padding: 8px 16px;
    }

    .sign-up-btn {
      min-width: 80px;
      font-size: 14px;
      padding: 8px 16px;
    }

    .right-section {
      gap: 10px;
    }
  }

  // Mobile screens
  @media (max-width: 768px) {
    .navbar-container {
      padding: 16px 20px;
      justify-content: center;
    }

    .enterprise-logo {
      display: block;
    }

    .explore-button {
      display: none;
    }

    .nav-links {
      display: none;
    }

    .right-section {
      display: none;
    }

    .hamburger-icon {
      display: none;
    }

    .mobile-menu {
      display: none;
    }

    .responsive-mobile-menu {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding: 10px 0;
      z-index: 1001;
    }
  }

  // Small mobile screens
  @media (max-width: 480px) {
    .navbar-container {
      padding: 12px 16px;
    }

    .responsive-mobile-menu {
      padding: 8px 0;
    }
  }
`;

export const StyledCustomNavLink = styled.a`
  color: #FFF !important; /* Enforced white color */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.1px;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 8px 0;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: white;
    transition: width 0.3s ease;
  }

  // &:hover:after {
  //   width: 100%;
  // }
`;