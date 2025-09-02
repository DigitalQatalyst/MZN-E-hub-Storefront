"use client";

import { useState, useEffect } from "react";
import Box from "../Box";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import Typography from "../Typography";
import styled from "styled-components";

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

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #007bff;
  }

  .sub-items {
    margin-left: 20px;
    color: #666;
    font-size: 14px;

    &.coming-soon {
      color: #999;
    }
  }
`;

interface ExploreModalProps {
  onClose: () => void;
}

export default function ExploreModal({ onClose }: ExploreModalProps) {
  const categories = [
    {
      title: "Financial",
      icon: "dollar",
      subItems: ["Loan Management & Adjustments", "Investment & Equity Financing", "Project & Specialized Financing"],
    },
    {
      title: "Non-Financial",
      icon: "business",
      subItems: ["Business Asset Financing", "Business Operations Financing"],
    },
    {
      title: "Courses",
      icon: "school",
      subItems: [],
    },
    {
      title: "Communities",
      icon: "people",
      subItems: [],
    },
    {
      title: "Media",
      icon: "play_circle",
      subItems: ["Coming soon"],
    },
    {
      title: "Investment",
      icon: "trending_up",
      subItems: ["Coming soon"],
    },
    {
      title: "Calendar",
      icon: "calendar_today",
      subItems: ["Coming soon"],
    },
    {
      title: "Opportunities",
      icon: "rocket",
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

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <ModalContent>
        {categories.map((category, index) => (
          <CategoryItem key={index}>
            <Icon>{category.icon}</Icon>
            <Typography>{category.title}</Typography>
            {category.subItems.length > 0 && (
              <div className="sub-items">
                {category.subItems.map((subItem, subIndex) => (
                  <Typography key={subIndex} className={subItem.includes("Coming soon") ? "coming-soon" : ""}>
                    {subItem}
                  </Typography>
                ))}
              </div>
            )}
          </CategoryItem>
        ))}
      </ModalContent>
    </>
  );
}