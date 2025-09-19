import styled from "styled-components";

export const StyledCustomNavLink = styled.a<{ mr?: string }>`
  // display: flex;
  align-items: center;
  // text-decoration: none;
  // font-size: 14px;
  // font-weight: 500;
  // line-height: 20px;
  // letter-spacing: -0.1px;
  color: #FFF;
  // margin-right: ${(props) => props.mr || "0"};
  // cursor: pointer;
  // transition: color 0.3s ease, transform 0.2s ease;

  // &:hover {
  //   color: #007bff;
  //   transform: translateY(-1px);
  // }

  // &.nav-link {
  //   padding: 8px 12px;
  //   border-radius: 4px;

  //   &.active {
  //     background-color: #f0f4ff;
  //     color: #007bff;
  //     font-weight: 600;
  //   }
  // }

  // img {
  //   max-width: 100%;
  //   height: auto;
  // }

  /* Mobile-specific styles */
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    // gap: 4px;
    // padding: 10px;
    // font-size: 12px;
    color: #FFF;

   
  }
`;