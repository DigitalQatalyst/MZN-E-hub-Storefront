import styled from "styled-components";

export const TabBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 50px;
  padding-top: 40px;
  POSITION: relative;
  margin-bottom: 20px; 

  .hamburger {
    display: none;
    cursor: pointer;
  }

  .hamburger-icon {
    width: 30px;
    height: 30px;
  }

  .tabs {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  @media (max-width: 768px) {
    .hamburger {
      display: block;
    }

    .tabs {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      padding: 10px;
    }

    .tabs.open {
      display: flex;
    }
  }

  @media (min-width: 769px) {
    .tabs {
      display: flex !important;
    }
  }
`;

interface TabProps {
  active?: boolean;
}

export const Tab = styled.div<TabProps>`
  cursor: pointer;
  padding: 10px 15px;
  transition: color 0.3s, border-bottom 0.3s;
  text-align: center;
  font-size: var(--Label-Large-Size, 14px);
  font-style: normal;
  font-weight: ${(props) => (props.active ? "bold" : "500")};
  line-height: var(--Label-Large-Line-Height, 20px);
  letter-spacing: var(--Label-Large-Tracking, 0.1px);
  
  color: ${(props) => (props.active ? '#0077cc' : '#747474')};
  
  ${(props) =>
    props.active &&
    `
    border-bottom: 2px solid #0077cc;
  `}
  
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    border-bottom: 1px solid #eee;
    justify-contentPt: flex-start;

    &:last-child {
      border-bottom: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px 15px;

    img {
      width: 18px;
      height: 18px;
    }
  }
`;