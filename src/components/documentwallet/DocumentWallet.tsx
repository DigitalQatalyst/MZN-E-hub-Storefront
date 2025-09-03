"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, Check, CheckCircle, X } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import styled from "styled-components";
import Container from "@component/Container";
import Card from "@component/Card";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import ChatComponent from "app/(layout-3)/(customer-dashboard)/chat/components/ChatComponent";
import Overview from "./Overview";
import MyUploads from "./MyUploads";
import MyDownloads from "./MyDownloads";
import MyBin from "./MyBin";

interface ApplicationProgressProps {
  // Props are now optional since we'll get data from URL params and API
}

interface ProgressStep {
  id: number;
  title: string;
  status: "completed" | "current" | "pending";
}

// Styled Components using Bonik patterns
const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #0030e3;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 24px;
  transition: color 0.2s ease;

  &:hover {
    color: #0025b8;
  }

  svg {
    margin-right: 8px;
  }
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: 12px 12px;
  //   border bottom
  border: none;
  border-bottom: ${({ isActive }) =>
    isActive ? "2px solid #0030E3" : "transparent"};
  color: ${({ isActive }) => (isActive ? "#0030E3" : "#6b7280")};
  background-color: transparent;
  font-size: 14px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#E6EFFF" : "#f3f4f6")};
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 32px 0;
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const ProgressStep = styled.div<{
  status: "completed" | "current" | "pending";
}>`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StepNumber = styled.div<{ status: "completed" | "current" | "pending" }>`
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  margin-right: 12px;
  color: ${({ status }) => {
    switch (status) {
      case "completed":
        return "#7367F0";
      case "current":
        return "#7367F0";
      case "pending":
        return "#9ca3af";
      default:
        return "#9ca3af";
    }
  }};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const StepIcon = styled.div<{ status: "completed" | "current" | "pending" }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
  border: 2px solid;

  border-color: ${({ status }) => {
    switch (status) {
      case "completed":
        return "#7367F0";
      case "current":
        return "#7367F0";
      case "pending":
        return "#e5e7eb";
      default:
        return "#e5e7eb";
    }
  }};

  background-color: ${({ status }) => {
    switch (status) {
      case "completed":
        return "#7367F0";
      case "current":
        return "white";
      case "pending":
        return "white";
      default:
        return "white";
    }
  }};

  color: ${({ status }) => {
    switch (status) {
      case "completed":
        return "white";
      case "current":
        return "#7367F0";
      case "pending":
        return "#9ca3af";
      default:
        return "#9ca3af";
    }
  }};
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepTitle = styled.div<{ status: "completed" | "current" | "pending" }>`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ status }) => {
    switch (status) {
      case "completed":
        return "#111827";
      case "current":
        return "#111827";
      case "pending":
        return "#9ca3af";
      default:
        return "#9ca3af";
    }
  }};
`;

const ConnectorLine = styled.div<{ isCompleted: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${({ isCompleted }) =>
    isCompleted ? "#7367F0" : "#e5e7eb"};
  margin: 0 24px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

const DetailLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;

const DetailValue = styled.span<{ color?: string }>`
  font-size: 14px;
  color: ${({ color }) => color || "#111827"};
  font-weight: 500;
`;

const StatusBadge = styled.span`
  color: #ff9f43;
  background-color: #ff9f4329;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
`;

const SuccessMessage = styled(Card)`
  background-color: #28c76f29;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
  padding: 16px;
  margin-top: 32px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #28c76f;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(40, 199, 111, 0.1);
  }
`;

const ErrorMessage = styled(Card)`
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 16px;
  margin-top: 32px;
  text-align: center;
`;

const DocumentWallet: React.FC<ApplicationProgressProps> = () => {
  const router = useRouter();
  const params = useParams();
  const applicationId = params.id as string;

  const [activeTab, setActiveTab] = useState<
    "Overview" | "My Uploads" | "My Downloads" | "My Bin"
  >("Overview");
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // Handle responsive design
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Loading state
  //   if (isLoading) {
  //     return (
  //       <Box p={isMobile ? "16px" : "24px"} minHeight="100vh">
  //         <Container maxWidth="1200px">
  //           <BackButton onClick={() => router.push("/non-financial-records")}>
  //             <ChevronLeft size={20} />
  //             Back to Service Requests
  //           </BackButton>

  //           <Card
  //             border="1px solid #e5e7eb"
  //             borderRadius="8px"
  //             p="32px"
  //             bg="white"
  //             mt="32px"
  //           >
  //             <Typography fontSize="16px" color="#6b7280">
  //               Loading application details...
  //             </Typography>
  //           </Card>
  //         </Container>
  //       </Box>
  //     );
  //   }

  const handleBack = () => {
    // Navigate back to the service requests page
    router.push("/non-financial-records");
  };

  return (
    <Box
      p={isMobile ? "16px" : "24px"}
      minHeight="100vh"
      backgroundColor="#F4F7FB"
    >
      <Container maxWidth="1200px">
        {/* Tab Navigation */}
        <FlexBox mb="0">
          <TabButton
            isActive={activeTab === "Overview"}
            onClick={() => setActiveTab("Overview")}
          >
            Overview
          </TabButton>
          <TabButton
            isActive={activeTab === "My Uploads"}
            onClick={() => setActiveTab("My Uploads")}
          >
            My Uploads
          </TabButton>
          <TabButton
            isActive={activeTab === "My Downloads"}
            onClick={() => setActiveTab("My Downloads")}
          >
            My Downloads
          </TabButton>
          <TabButton
            isActive={activeTab === "My Bin"}
            onClick={() => setActiveTab("My Bin")}
          >
            My Bin
          </TabButton>
        </FlexBox>

        {activeTab === "Overview" && <Overview />}
        {activeTab === "My Uploads" && <MyUploads />}
        {activeTab === "My Downloads" && <MyDownloads />}
        {activeTab === "My Bin" && <MyBin />}
      </Container>
    </Box>
  );
};

export default DocumentWallet;
