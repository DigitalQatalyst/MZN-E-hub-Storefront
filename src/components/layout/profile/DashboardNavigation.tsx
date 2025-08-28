"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import styled from 'styled-components';
import Card from '@component/Card';
import Box from '@component/Box';
import FlexBox from '@component/FlexBox';
import Typography from '@component/Typography';

// Styled components following Bonik patterns
const SidebarContainer = styled.div`
  width: 256px;
  background-color: white;
  height: 100vh;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
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
  background-color: ${props => props.$isHovered ? '#f9fafb' : 'transparent'};
`;

const CompanyName = styled.span`
  font-weight: 500;
  color: #0030E3;
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
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 1001;
  overflow: hidden;
`;

const AccountItem = styled.div<{ $isSelected?: boolean; $isHovered?: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${props => {
    if (props.$isSelected) return '#f0f4ff';
    if (props.$isHovered) return '#f9fafb';
    return 'transparent';
  }};
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AddBusinessButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #0030E3;
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
  background-color: ${props => {
    if (props.$active) return '#0030E3';
    if (props.$hovered) return '#f9fafb';
    return 'transparent';
  }};
  color: ${props => props.$active ? 'white' : '#374151'};
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
"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

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
    id: 'futuretech',
    name: 'FutureTech LLC'
  });
  const [isCompanySelectorHovered, setIsCompanySelectorHovered] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Available companies
  const companies: Company[] = [
    { id: 'futuretech', name: 'FutureTech LLC' },
    { id: 'algora', name: 'Algora Solutions' }
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
      route: "/#",
    },
  ];

  const transactionItems: NavItem[] = [
    { id: 'requests', label: 'Requests', icon: '/images/overview.svg', route: '/non-financial-records' },
    { id: 'insights', label: 'Insights', icon: '/images/analytics.svg', route: '/insights' },
  ];

  const settingsItems: NavItem[] = [
    {
      id: "settings",
      label: "Settings",
      icon: "/images/settings.svg",
      route: "/#",
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
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const isActive = (route: string) => pathname === route;

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(false);
    // Here you would typically handle the company switching logic
    console.log('Switched to company:', company.name);
  };

  const handleAddBusiness = () => {
    setIsModalOpen(false);
    // Handle add business logic
    console.log('Add business clicked');
  };

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.route);

    return (
      <NavItem
        key={item.id}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          paddingLeft: "12px",
          paddingRight: "12px",
          paddingTop: "8px",
          paddingBottom: "8px",
          backgroundColor: active
            ? "#0030E3"
            : hoveredItem === item.id
            ? "#f9fafb"
            : "transparent",
          color: active ? "white" : "#374151",
          borderRadius: "8px",
          cursor: "pointer",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
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
        <span style={{ fontWeight: "500" }}>{item.label}</span>
      </div>
        <span>{item.label}</span>
      </NavItem>
    );
  };

  return (
    <div
      style={{
        width: "256px",
        backgroundColor: "white",
        height: "100vh",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
    <SidebarContainer>
      {/* Modal Overlay - only render when modal is open */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)} />
      )}
      
      {/* Company Selector */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontWeight: "500",
                color: "#0030E3",
                fontFamily:
                  "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              FutureTech LLC
            </span>
          </div>
          <ChevronDown
            style={{ width: "16px", height: "16px", color: "#0030E3" }}
          />
        </div>
      </div>
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
                width: '16px', 
                height: '16px', 
                color: '#0030E3',
                transition: 'transform 0.2s ease',
                transform: isModalOpen ? 'rotate(180deg)' : 'rotate(0deg)'
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
        <div
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "8px",
              paddingBottom: "8px",
              backgroundColor: isActive("/dashboard")
                ? "#0030E3"
                : hoveredItem === "overview"
                ? "#f9fafb"
                : "transparent",
              color: isActive("/dashboard") ? "white" : "#374151",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily:
                "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            onMouseEnter={() => setHoveredItem("overview")}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleNavigation("/dashboard")}
          >
            <img
              src="/images/dashboard-customize-light.svg"
              alt="Dashboard"
              height="20px"
        <Box px="16px" mb="24px">
          <NavItem
            $active={isActive('/dashboard')}
            $hovered={hoveredItem === 'overview'}
            onMouseEnter={() => setHoveredItem('overview')}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleNavigation('/dashboard')}
            style={{ borderRadius: '4px' }}
          >
            <img 
              src="/images/dashboard-customize-light.svg" 
              alt="Dashboard" 
              height="20px" 
              style={{
                filter: isActive("/dashboard")
                  ? "brightness(0) invert(1)"
                  : "brightness(0) opacity(0.6)",
              }}
            />
            <span
              style={{
                fontWeight: "500",
                fontFamily:
                  "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Overview
            </span>
          </div>
        </div>
            <span>Overview</span>
          </NavItem>
        </Box>

        {/* Essentials Section */}
        <div
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            marginBottom: "16px",
          }}
        >
          <h3
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#242424",
              letterSpacing: "0.05em",
              marginBottom: "8px",
              fontFamily:
                "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Essentials
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {essentialItems.map(renderNavItem)}
          </div>
        </div>
        <Box px="16px" mb="16px">
          <SectionTitle>Essentials</SectionTitle>
          <FlexBox flexDirection="column">
            {essentialItems.map((item, index) => (
              <Box key={item.id} mb={index < essentialItems.length - 1 ? "4px" : "0px"}>
                {renderNavItem(item)}
              </Box>
            ))}
          </FlexBox>
        </Box>

        {/* Transactions Section */}
        <div
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            marginBottom: "16px",
          }}
        >
          <h3
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#242424",
              letterSpacing: "0.05em",
              marginBottom: "8px",
              fontFamily:
                "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Transactions
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {transactionItems.map(renderNavItem)}
          </div>
        </div>
        <Box px="16px" mb="16px">
          <SectionTitle>Transactions</SectionTitle>
          <FlexBox flexDirection="column">
            {transactionItems.map((item, index) => (
              <Box key={item.id} mb={index < transactionItems.length - 1 ? "4px" : "0px"}>
                {renderNavItem(item)}
              </Box>
            ))}
          </FlexBox>
        </Box>

        {/* Settings & Support Section */}
        <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <h3
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#242424",
              letterSpacing: "0.05em",
              marginBottom: "8px",
              fontFamily:
                "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Settings & Support
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {settingsItems.map(renderNavItem)}
          </div>
        </div>
        <Box px="16px">
          <SectionTitle>Settings & Support</SectionTitle>
          <FlexBox flexDirection="column">
            {settingsItems.map((item, index) => (
              <Box key={item.id} mb={index < settingsItems.length - 1 ? "4px" : "0px"}>
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
