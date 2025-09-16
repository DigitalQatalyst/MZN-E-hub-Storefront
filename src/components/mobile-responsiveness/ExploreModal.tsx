"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Box from "../Box";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import Typography from "../Typography";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.5);
  z-index: 1002;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 80px);
  background: #f9f9f9;
  padding: 20px;
  z-index: 1003;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
 display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  row-gap: 5px; /* Vertical spacing between rows */
  align-content: flex-start; /* Keeps items at the top */
`;

const CategoryItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px; /* Reduced padding to make boxes smaller */
  cursor: pointer;
  text-align: center;
  width: 150px; /* Fixed width to make rectangles */
  height: 60px; /* Fixed height to make rectangles */

  ${props =>
    props.active
      ? `
        border-radius: 8px;
        border: 1px solid #0030E3;
        color: #0030E3;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 16px;
      `
      : `
        color: #747474;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        border-radius: 8px;
        border: 1px solid #E0E0E0;
      `}

  &:hover {
    color: #0030E3;
    background: #f0f0f0;
  }

  .sub-items {
    margin-left: 20px;
    color: #333;
    font-size: 14px;
    display: none;
  }
`;

interface ExploreModalProps {
  onClose: () => void;
}

export default function ExploreModal({ onClose }: ExploreModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const routeToTabMap: { [key: string]: string[] } = {
    "/non-financial-marketplace": ["Non-Financial"],
    "/financial-marketplace": ["Financial"],
    "/development": ["Courses", "Investment", "Calendar", "Opportunities"],
    "/community-marketplace": ["Communities"],
    "https://kf-ej-media-marketplace-c7ifty1ol-digitalqatalysts-projects.vercel.app/media/": ["Media"],
  };

  const [activeTab, setActiveTab] = useState<string>(() => {
    for (const [route, tabs] of Object.entries(routeToTabMap)) {
      if (pathname === route && tabs.length > 0) {
        return tabs[0];
      }
    }
    return "Financial";
  });

  useEffect(() => {
    for (const [route, tabs] of Object.entries(routeToTabMap)) {
      if (pathname === route && tabs.length > 0) {
        setActiveTab(tabs[0]);
        return;
      }
    }
    setActiveTab("Financial");
  }, [pathname]);

  const categories = [
    {
      title: "Non-Financial",
      path: "/non-financial-marketplace",
      iconActive: "/assets/images/tab_bar/all_inclusive_active.svg",
      iconInactive: "/assets/images/tab_bar/all_inclusive.svg",
      subItems: ["Business Asset Financing", "Business Operations Financing"],
    },
    {
      title: "Financial",
      path: "/financial-marketplace",
      iconActive: "/assets/images/tab_bar/money_bag.svg",
      iconInactive: "/assets/images/tab_bar/money_bag_inactive.svg",
      subItems: ["Loan Management & Adjustments", "Investment & Equity Financing", "Project & Specialized Financing"],
    },
    {
      title: "Courses",
      path: "/development",
      iconActive: "/assets/images/tab_bar/local_library.svg",
      iconInactive: "/assets/images/tab_bar/local_library.svg",
      subItems: [],
    },
    {
      title: "Communities",
      path: "/community-marketplace",
      iconActive: "/assets/images/tab_bar/groups.png",
      iconInactive: "/assets/images/tab_bar/forum.svg",
      subItems: [],
    },
    {
      title: "Media",
      path: "https://kf-ej-media-marketplace-c7ifty1ol-digitalqatalysts-projects.vercel.app/media/",
      iconActive: "/assets/images/tab_bar/brand_awareness.svg",
      iconInactive: "/assets/images/tab_bar/brand_awareness.svg",
      subItems: ["Coming soon"],
    },
    {
      title: "Investment",
      path: "/development",
      iconActive: "/assets/images/tab_bar/crowdsource.svg",
      iconInactive: "/assets/images/tab_bar/crowdsource.svg",
      subItems: ["Coming soon"],
    },
    {
      title: "Calendar",
      path: "/development",
      iconActive: "/assets/images/tab_bar/calendar_month.svg",
      iconInactive: "/assets/images/tab_bar/calendar_month.svg",
      subItems: ["Coming soon"],
    },
    {
      title: "Opportunities",
      path: "/development",
      iconActive: "/assets/images/tab_bar/rocket_launch.svg",
      iconInactive: "/assets/images/tab_bar/rocket_launch.svg",
      subItems: ["Coming soon"],
    },
  ];

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleCategoryClick = (tabName: string, path: string) => {
    setActiveTab(tabName);
    if (path.startsWith("http")) {
      window.location.href = path;
    } else {
      router.push(path);
    }
    if (expandedCategory === tabName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(tabName);
    }
  };

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            active={activeTab === category.title}
            onClick={() => handleCategoryClick(category.title, category.path)}
          >
            <Typography>{category.title}</Typography>
          </CategoryItem>
        ))}
      </ModalContent>
    </>
  );
}