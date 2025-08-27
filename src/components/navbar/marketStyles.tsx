import styled from "styled-components";

export const StyledNavbar = styled.div`
  background: linear-gradient(90deg, #01E5D1 0%, #02E4D1 8.12%, #04E2D2 14.47%, #07DFD3 19.42%, #0CDAD5 23.32%, #12D5D7 26.54%, #18CEDA 29.42%, #20C7DD 32.34%, #29BEE0 35.66%, #33B5E4 39.72%, #3DABE8 44.89%, #48A0EC 51.54%, #5395F1 60.01%, #6089F5 70.67%, #6C7DFA 83.88%, #7970FF 100%) !important;
  backdrop-filter: none;
  box-shadow: none;
  border-bottom: none;
  position: relative;
  z-index: 1000;
  height: 60px;

  &.scrolled {
    background: linear-gradient(90deg, #01E5D1 0%, #02E4D1 8.12%, #04E2D2 14.47%, #07DFD3 19.42%, #0CDAD5 23.32%, #12D5D7 26.54%, #18CEDA 29.42%, #20C7DD 32.34%, #29BEE0 35.66%, #33B5E4 39.72%, #3DABE8 44.89%, #48A0EC 51.54%, #5395F1 60.01%, #6089F5 70.67%, #6C7DFA 83.88%, #7970FF 100%) !important;
  }

  .navbar-container {
    max-width: none;
    margin: 0;
    padding: 0 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    background: none !important;
  }

  .enterprise-logo {
    font-family: "Open Sans", sans-serif;
    font-size: 30px;
    font-weight: 700;
    color: white;
    text-decoration: none;
    letter-spacing: -0.5px;
    line-height: 1.2;
    text-transform: uppercase;
    gap: 10px;
    margin-right: 20px;

    img {
      width: 120px;
      height: auto;
    }
  }

  .explore-button {
    background: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 0 16px;
    min-width: 240px;
    height: 40px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    margin-right: 20px;
    gap: 5px; /* Added to maintain spacing between icon and text */
  }

  .explore-text {
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 26px;
    color: #002180;
  }

  .nav-links {
    gap: 20px;
    display: flex;
    align-items: center;

    .nav-link {
      color: #002180 !important;
      font-weight: 500;
      font-size: 16px;
      text-decoration: none;
      transition: all 0.3s ease;
      padding: 8px 0;
      position: relative;
    }
  }

  .right-section {
    gap: 15px;
    align-items: center;
    display: flex;
  }

  .search-icon, .profile-icon, .hamburger-icon {
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .search-icon {
    width: 24px;
    height: 20px;
  }

  .profile-icon {
    width: 68px;
    height: 32px;
  }

  .hamburger-icon {
    width: 24px;
    height: 24px;
    display: none;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: linear-gradient(224.55deg, #7693F3 0.02%, #6D9FBA 99.24%);
    padding: 20px;
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    &.open {
      transform: translateX(0);
    }
    .mobile-nav-links {
      flex-direction: column;
      gap: 20px;
      margin-top: 40px;
    }
    .mobile-right-section {
      flex-direction: column;
      margin-top: 20px;
    }
    .mobile-explore-button {
      width: 100%;
      min-width: 200px;
      padding: 0 16px;
    }
  }

  .become-partner-btn, .logout-btn {
    background: transparent !important;
    border: 2px solid rgba(255, 255, 255, 0.8) !important;
    color: white !important;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
    min-width: 140px;
  }

  .sign-up-btn {
    background: white !important;
    color: #0000FF !important;
    border: 2px solid white !important;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
    min-width: 100px;
  }

  @media (max-width: 1024px) {
    .navbar-container { padding: 16px 40px; }
    .enterprise-logo img { width: 90px; }
    .nav-links { gap: 15px; }
    .explore-button { min-width: 110px; }
    .become-partner-btn, .logout-btn { min-width: 120px; font-size: 13px; padding: 8px 16px; }
    .sign-up-btn { min-width: 80px; font-size: 13px; padding: 8px 16px; }
    .right-section { gap: 15px; }
  }

  @media (max-width: 768px) {
    .navbar-container { padding: 16px 20px; justify-content: flex-start; }
    .enterprise-logo, .explore-button, .nav-links, .right-section { display: none; }
    .hamburger-icon { display: block; position: absolute; top: 16px; left: 20px; }
    .mobile-menu { display: block; }
  }

  @media (max-width: 480px) {
    .navbar-container { padding: 12px 16px; }
    .mobile-menu { width: 100%; max-width: none; }
  }
`;