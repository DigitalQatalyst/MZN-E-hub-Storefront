"use client";

import styled from "styled-components";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Navbar from "@component/navbar/Navbar";
import SideNavbar3 from "@component/sidenav/SideNavbar3";
import Section1 from "@sections/fulfillment/section1";

// LOCAL STYLES
const PageContainer = styled(Box)`
  min-height: 100vh;
`;

const MainLayout = styled(FlexBox)`
  min-height: calc(100vh - 80px);
  gap: 0;
`;

const SidebarContainer = styled(Box)`
  width: auto;
  background-color: #f8f9fa;
  border-right: 1px solid #e5e7eb;
  flex-shrink: 0;
  height: calc(100vh - 80px);
  position: relative;
  top: 35px;
`;

const ContentContainer = styled(Box)`
  flex: 1;
  background-color: #F4F7FB;
  border-left: none;
  overflow: hidden;
  position: relative;
  padding: 20px 20px 20px 0;
  border-radius: 0 8px 8px 0;
  padding-left: 2rem;

  @media (max-width: 851px) {
    padding-left: 65px;

  }

`;

export default function Fulfillment() {
  return (
    <PageContainer>
      <Navbar />
      <MainLayout>
        <SidebarContainer>
          <SideNavbar3 />
        </SidebarContainer>
        <ContentContainer>
          <Section1 />
        </ContentContainer>
      </MainLayout>
    </PageContainer>
  );
}
