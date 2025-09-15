"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import styled from "styled-components";
import Card from "@component/Card";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";

// Styled components following Bonik patterns
const SidebarContainer = styled.div`
  width: 256px;
  background-color: #F5F5F5;
  height: 100vh;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  font-family: 'Open Sans', Inter, -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
`;

const CompanySelectorContainer = styled.div`
  position: relative;
`;

const CompanySelector = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
`;

const CompanyInfo = styled.div<{ $isHovered?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.$isHovered ? "#f9fafb" : "transparent"};
`;

const CompanyName = styled.span`
  font-weight: 500;
  color: #0030e3;
  font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 1000;
`;

const AccountModal = styled(Card)`
  position: absolute;
  top: 100%;
  left: 8px;
  right: 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 1001;
  overflow: hidden;
`;

const AccountItem = styled.div<{ $isSelected?: boolean; $isHovered?: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${(props) => {
    if (props.$isSelected) return "#f0f4ff";
    if (props.$isHovered) return "#f9fafb";
    return "transparent";
  }};
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const AddBusinessButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #0030e3;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin: 8px;
  width: calc(100% - 16px);

  &:hover {
    background-color: #0026c7;
  }
`;

const NavItem = styled.div<{ $active?: boolean; $hovered?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background-color: ${(props) => {
    if (props.$active) return "#0030E3";
    if (props.$hovered) return "#f9fafb";
    return "transparent";
  }};
  color: ${(props) => (props.$active ? "white" : "#374151")};
  border-radius: 8px;
  cursor: pointer;
  font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: #242424;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
`;

interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

interface Company {
  id: string;
  name: string;
}

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company>({
    id: "futuretech",
    name: "FutureTech LLC",
  });
  const [isCompanySelectorHovered, setIsCompanySelectorHovered] =
    useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Available companies
  const companies: Company[] = [
    { id: "futuretech", name: "FutureTech LLC" },
    { id: "algora", name: "Algora Solutions" },
  ];

  const essentialItems: NavItem[] = [
    {
      id: "profile",
      label: "Profile",
      icon: "/images/vertical-shades-closed.svg",
      route: "/firm-profile",
    },
    {
      id: "documents",
      label: "Documents",
      icon: "/images/home-storage.svg",
      route: "/",
    },
  ];

  const transactionItems: NavItem[] = [
    {
      id: "requests",
      label: "Requests",
      icon: "/images/overview.svg",
      route: "/non-financial-records",
    },
    {
      id: "insights",
      label: "Insights",
      icon: "/images/analytics.svg",
      route: "/insights",
    },
    {
      id: "reporting-obligations",
      label: "Reporting Obligations",
      icon: "/images/home-storage.svg",
      route: "/",
    },
  ];

  const settingsItems: NavItem[] = [
    {
      id: "settings",
      label: "Settings",
      icon: "/images/settings.svg",
      route: "/user-management",
    },
    {
      id: "support",
      label: "Support",
      icon: "/images/contact-support.svg",
      route: "/support",
    },
  ];

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const isActive = (route: string) => {
    // Special handling for Documents route to keep it active on sub-routes
    if (route === "/documents") {
      return pathname.startsWith("/documents");
    }
    // For other routes, exact match
    return pathname === route;
  };

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(false);
    // Here you would typically handle the company switching logic
    console.log("Switched to company:", company.name);
  };

  const handleAddBusiness = () => {
    setIsModalOpen(false);
    // Handle add business logic
    console.log("Add business clicked");
  };

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.route);

    return (
      <NavItem
        key={item.id}
        $active={active}
        $hovered={hoveredItem === item.id}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        onClick={() => handleNavigation(item.route)}
      >
        <img
          src={item.icon}
          alt={item.label}
          height="20px"
          style={{
            filter: active ? "brightness(0) invert(1)" : "none",
          }}
        />
        <span>{item.label}</span>
      </NavItem>
    );
  };

  return (
    <SidebarContainer>
      {/* Modal Overlay - only render when modal is open */}
      {isModalOpen && <ModalOverlay onClick={() => setIsModalOpen(false)} />}

      {/* Company Selector */}
      <CompanySelectorContainer ref={modalRef}>
        <CompanySelector>
          <CompanyInfo
            $isHovered={isCompanySelectorHovered}
            onMouseEnter={() => setIsCompanySelectorHovered(true)}
            onMouseLeave={() => setIsCompanySelectorHovered(false)}
          >
            <CompanyName>{selectedCompany.name}</CompanyName>
            <ChevronDown
              style={{
                width: "16px",
                height: "16px",
                color: "#0030E3",
                transition: "transform 0.2s ease",
                transform: isModalOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
              onClick={handleChevronClick}
            />
          </CompanyInfo>

          {/* Account Switching Modal */}
          {isModalOpen && (
            <AccountModal>
              <Box>
                {companies.map((company) => (
                  <AccountItem
                    key={company.id}
                    $isSelected={company.id === selectedCompany.id}
                    $isHovered={hoveredCompany === company.id}
                    onMouseEnter={() => setHoveredCompany(company.id)}
                    onMouseLeave={() => setHoveredCompany(null)}
                    onClick={() => handleCompanySelect(company)}
                  >
                    <Typography variant="body2" fontWeight="500">
                      {company.name}
                    </Typography>
                  </AccountItem>
                ))}

                <Box mt="8px">
                  <AddBusinessButton onClick={handleAddBusiness}>
                    Add a Business
                  </AddBusinessButton>
                </Box>
              </Box>
            </AccountModal>
          )}
        </CompanySelector>
      </CompanySelectorContainer>

      {/* Navigation */}
      <div style={{ flex: 1, paddingTop: "16px", paddingBottom: "16px" }}>
        {/* Overview - Dashboard */}
        <Box px="16px" mb="24px">
          <NavItem
            $active={isActive("/overview")}
            $hovered={hoveredItem === "overview"}
            onMouseEnter={() => setHoveredItem("overview")}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleNavigation("/overview")}
            style={{ borderRadius: "4px" }}
          >
            <img
              src="/images/dashboard-customize-light.svg"
              alt="Dashboard"
              height="20px"
              style={{
                filter: isActive("/overview")
                  ? "brightness(0) invert(1)"
                  : "brightness(0) opacity(0.6)",
              }}
            />
            <span>Overview</span>
          </NavItem>
        </Box>

        {/* Essentials Section */}
        <Box px="16px" mb="16px">
          <SectionTitle>Essentials</SectionTitle>
          <FlexBox flexDirection="column">
            {essentialItems.map((item, index) => (
              <Box
                key={item.id}
                mb={index < essentialItems.length - 1 ? "4px" : "0px"}
              >
                {renderNavItem(item)}
              </Box>
            ))}
          </FlexBox>
        </Box>

        {/* Transactions Section */}
        <Box px="16px" mb="16px">
          <SectionTitle>Transactions</SectionTitle>
          <FlexBox flexDirection="column">
            {transactionItems.map((item, index) => (
              <Box
                key={item.id}
                mb={index < transactionItems.length - 1 ? "4px" : "0px"}
              >
                {renderNavItem(item)}
              </Box>
            ))}
          </FlexBox>
        </Box>

        {/* Settings & Support Section */}
        <Box px="16px">
          <SectionTitle>Settings & Support</SectionTitle>
          <FlexBox flexDirection="column">
            {settingsItems.map((item, index) => (
              <Box
                key={item.id}
                mb={index < settingsItems.length - 1 ? "4px" : "0px"}
              >
                {renderNavItem(item)}
              </Box>
            ))}
          </FlexBox>
        </Box>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
