"use client";


import NavigationSection from "./NavigationSection";
import FundingApplicationSection from "./FundingApplicationSection";
import ApplicationSubmittedSection from "./ApplicationSubmittedSection";
import ApplicationDetailsSection from "./ApplicationDetailsSection";


import { useState } from "react";
import styled from "styled-components";
import Box from "@component/Box";


// LOCAL STYLES
const ContentWrapper = styled(Box)`
  height: 100%;
  overflow-y: auto;
  display: flex;
  gap: 24px;
  flex-direction: column;
  margin-top: 70px;
}
`;

export default function Section1() {
  const [activeTab, setActiveTab] = useState<"progress" | "chat">("progress");
  const [showSubmittedMessage, setShowSubmittedMessage] = useState(true);

  const handleBackToRequests = () => {
    console.log("Navigate back to requests");
  };

  const handleTabChange = (tab: "progress" | "chat") => {
    setActiveTab(tab);
  };

  const handleViewApplication = () => {
    console.log("View application details");
  };


  const handleCloseMessage = () => {
    setShowSubmittedMessage(false);
  };

  return (
    <ContentWrapper>
      <NavigationSection
        onBackClick={handleBackToRequests}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {activeTab === "progress" && (
        <>
          <FundingApplicationSection />

          {showSubmittedMessage && (
            <ApplicationSubmittedSection onClose={handleCloseMessage} />
          )}

          <ApplicationDetailsSection
            onViewApplication={handleViewApplication}
          />
        </>
      )}

      {activeTab === "chat" && (
        <Box padding="24px">
          <Box 
            height="400px" 
            backgroundColor="#f9fafb" 
            borderRadius="8px" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
            color="#6b7280"
            fontSize="16px"
            fontWeight="500"
          >
            In-Service Chat Interface
            <br />
            <Box fontSize="14px" mt="8px" color="#9ca3af">
              Chat functionality would be implemented here
            </Box>
          </Box>
        </Box>
      )}
    </ContentWrapper>
  );
}


