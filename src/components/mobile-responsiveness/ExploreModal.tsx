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
  background: rgba(0, 0, 0, 0.5);
  z-index: 1002;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: #f9f9f9;
  padding: 20px;
  z-index: 1003;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const CategoryItem = styled.div<{ active?: boolean; expanded?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  cursor: pointer;
  color: ${props => (props.active ? "#0030E3" : "#333")};
  font-weight: ${props => (props.active ? "500" : "400")};
  transition: color 0.3s ease;

  &:hover {
    color: #0030E3;
  }

  .sub-items {
    margin-left: 20px;
    color: #333;
    font-size: 14px;
    display: ${props => (props.expanded ? "block" : "none")};

    &.coming-soon {
      color: #999;
    }
  }

  .dropdown-icon {
    margin-left: auto;
    transition: transform 0.3s ease;
    transform: ${props => (props.expanded ? "rotate(180deg)" : "rotate(0deg)")};
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
            expanded={expandedCategory === category.title}
            onClick={() => handleCategoryClick(category.title, category.path)}
          >
            <img
              src={activeTab === category.title ? category.iconActive : category.iconInactive}
              alt={`${category.title} icon`}
              style={{ width: 24, height: 24 }}
            />
            <Typography>{category.title}</Typography>
            {/* {category.subItems.length > 0 && (
              <FaChevronDown className="dropdown-icon" />
            )} */}
            {/* {expandedCategory === category.title && category.subItems.length > 0 && (
              <div className="sub-items">
                {category.subItems.map((subItem, subIndex) => (
                  <Typography key={subIndex} className={subItem.includes("Coming soon") ? "coming-soon" : ""}>
                    {subItem}
                  </Typography>
                ))}
              </div>
            )} */}
          </CategoryItem>
        ))}
      </ModalContent>
    </>
  );
}