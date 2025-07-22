
"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import Scrollbar from "@component/Scrollbar";
import NavLink from "@component/nav-link";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Span, H6 } from "@component/Typography";

// Styled Components

const DrawerContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  transform: translateX(${({ visible }) => (visible ? "0" : "-100%")});

  @media (min-width: 851px) {
    transform: translateX(0);
    position: sticky;
    overflow: hidden;
    top: 0;
    left: 0;
    box-shadow: none;

  }
`;

// Updated mobile icon bar with improved styling
const MobileIconBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 60px;
  height: 100vh;
  z-index: 998;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background-color: #DCDCDC;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 851px) {
    display: none;
  }
`;

const MobileIconItem = styled.div<{ active?: boolean }>`
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: ${({ active }) => (active ? "#ffffff" : "transparent")};
  box-shadow: ${({ active }) => (active ? "0 2px 8px rgba(37, 99, 235, 0.2)" : "none")};
  
  &:hover {
    background-color: ${({ active }) => (active ? "#ffffff" : "rgba(255, 255, 255, 0.7)")};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Overlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ visible }) => (visible ? "100%" : "0")};
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease;
  z-index: 999;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};

  @media (min-width: 851px) {
    display: none;
  }
`;

const ToggleButton = styled.div`
  position: fixed;
  bottom: 18px;
  left: 8px;
  z-index: 1100;
  cursor: pointer;
  background-color: #2563eb;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (min-width: 851px) {
    display: none;
  }
`;

const StyledNavItem = styled(FlexBox)<{ active?: boolean; showLabels?: boolean; isChild?: boolean }>(({ active, showLabels, isChild }) => ({
  padding: isChild ? "10px 16px 10px 32px" : "14px 18px",
  margin: "3px 8px",
  borderRadius: "10px",
  alignItems: "center",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  backgroundColor: active ? "#0030E3" : "transparent",
  color: active ? "white" : "#374151",
  flexDirection: "row",
  minHeight: "44px",

  "&:hover": {
    backgroundColor: active ? "#2563eb" : "#f3f4f6",
    color: active ? "white" : "#2563eb",
    transform: "translateX(2px)"
  },

  "@media (min-width: 851px)": {
    margin: "2px 12px",
    padding: isChild ? "12px 18px 12px 36px" : "16px 20px",
    minHeight: "48px"
  }
}));

const IconOnly = styled(Icon)<{ showLabels?: boolean }>`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
`;

const SpanText = styled(Span)<{ show?: boolean }>`
  font-size: 13px;
  margin-left: 10px;
  white-space: nowrap;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;

  @media (min-width: 851px) {
    font-size: 14px;
    margin-left: 12px;
  }
`;

const CompanyHeader = styled(FlexBox)<{ show?: boolean }>`
  padding: 18px 22px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 12px;
  align-items: center;
  background-color: white;

  @media (max-width: 850px) {
    display: ${({ show }) => (show ? "flex" : "none")};
  }


  @media (min-width: 851px) {
    padding: 24px 24px;
    margin-bottom: 16px;
  }
`;

const SectionHeader = styled(H6)<{ show?: boolean }>`
  padding: 14px 22px 10px 22px;
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: ${({ show }) => (show ? "block" : "none")};

  @media (min-width: 851px) {
    display: block;
    padding: 16px 24px 12px 24px;
    font-size: 12px;
  }
`;

const AccordionWrapper = styled.div`
  .accordion-header {
    margin: 0;
  }
  
  .accordion-content {
    padding: 0;
  }
`;

// Sidebar Component

export default function SideNavbar2() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
  const handleResize = () => {
    setShowLabels(window.innerWidth > 850);
  };
  handleResize(); // set initially
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setShowLabels(!showLabels);
  };

  const handleNavigation = (href: string) => {
    if (href && href !== "#") {
      router.push(href);
      // Close mobile sidebar after navigation
      if (window.innerWidth <= 850) {
        setIsOpen(false);
        setShowLabels(false);
      }
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isRequestsActive = true;

  const navigationItems = [
    { section: "company", title: "FutureTech LLC", isHeader: true },
    { section: "essentials", title: "Essentials", isSection: true },
    { section: "essentials", title: "Overview", icon: "home", href: "#" },
    { section: "essentials", title: "Profile", icon: "user", href: "#" },
    { section: "essentials", title: "Documents", icon: "Bookmark", href: "#" },
    {
      section: "transactions", 
      title: "Transactions", 
      icon: "credit-card",
      isSection: true,
      children: [
        { title: "Requests", icon: "chevron-up", href: "#", isActive: isRequestsActive },
        { title: "Insights", icon: "ranking", href: "#" }
      ]
    },
    { section: "settings", title: "Settings & Support", isSection: true },
    { section: "settings", title: "Settings", icon: "settings", href: "#" },
    { section: "settings", title: "Support", icon: "black_phone", href: "#" }
  ];

  // Get main navigation items for mobile icon bar
  const getMobileIconItems = () => {
    const items = navigationItems.filter(item => item.icon && !item.isSection && !item.isHeader);
    // Add transactions section as a single icon
    const transactionsSection = navigationItems.find(item => item.section === "transactions" && item.children);
    if (transactionsSection) {
      items.push({
        section: "transactions",
        title: "Transactions", 
        icon: "credit-card",
        href: "/transactions"
      });
    }
    return items;
  };

  const renderNavigationItems = () =>
    navigationItems.map((item, index) => {
      if (item.isHeader) {
        return (
          <CompanyHeader key={index} show={showLabels}>
            <H6 fontSize="16px" fontWeight="600" color="#1f2937">
              {item.title}
            </H6>
            <Icon ml="auto" size="16px" color="#2563eb">chevron-down</Icon>
          </CompanyHeader>
        );
      }

      if (item.isSection && !item.children) {
        return <SectionHeader key={index} show={showLabels}>{item.title}</SectionHeader>;
      }

      if (item.children) {
        const isExpanded = expandedSections.includes(item.section) || item.children.some((child) => child.isActive || pathname === child.href);
        const hasActiveChild = item.children.some((child) => child.isActive && pathname === child.href);
        
        return (
          <AccordionWrapper key={index}>
            <div 
              onClick={() => toggleSection(item.section)}
              style={{ cursor: 'pointer' }}
            >
              <StyledNavItem active={hasActiveChild} showLabels={showLabels}>
                <IconOnly size="18px" color={hasActiveChild ? "white" : "white"}>{item.icon}</IconOnly>
                <SpanText show={showLabels}>{item.title}</SpanText>
                {showLabels && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "auto",
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <Icon size="16px" color={hasActiveChild ? "white" : "white"}>
                      chevron-right
                    </Icon>
                  </span>
                )}
              </StyledNavItem>
            </div>
            {isExpanded && item.children.map((child, cIndex) => (
              <div key={cIndex} onClick={() => handleNavigation(child.href)}>
                <StyledNavItem 
                  active={child.isActive || pathname === child.href} 
                  showLabels={showLabels}
                  isChild={true}
                >
                  <IconOnly size="14px" color={(child.isActive || pathname === child.href) ? "white" : "#2563eb"}>{child.icon}</IconOnly>
                  <SpanText show={showLabels}>{child.title}</SpanText>
                </StyledNavItem>
              </div>
            ))}
          </AccordionWrapper>
        );
      }

      const isActive = pathname === item.href;
      return (
        <div key={index} onClick={() => handleNavigation(item.href)}>
          <StyledNavItem active={isActive} showLabels={showLabels}>
            <IconOnly size="18px" color={isActive ? "white" : "#2563eb"}>{item.icon}</IconOnly>
            <SpanText show={showLabels}>{item.title}</SpanText>
          </StyledNavItem>
        </div>
      );
    });

  return (
    <>
      {/* Mobile Icon Bar */}
      <MobileIconBar>
        {getMobileIconItems().map((item, index) => (
          <MobileIconItem 
            key={index} 
            active={pathname === item.href}
            onClick={() => handleNavigation(item.href)}
          >
            <Icon size="20px" color="#2563eb">
              {item.icon}
            </Icon>
          </MobileIconItem>
        ))}
      </MobileIconBar>

      <Overlay visible={isOpen} onClick={() => setIsOpen(false)} />
      
      <DrawerContainer visible={isOpen}>
        <Scrollbar>{renderNavigationItems()}</Scrollbar>
      </DrawerContainer>
      
      <ToggleButton onClick={toggleSidebar}>
        <Icon size="20px" color="white">
          {isOpen ? "x" : "menu"}
        </Icon>
      </ToggleButton>
    </>
  );
}