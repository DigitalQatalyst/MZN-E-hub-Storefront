"use client";

import Box from "@component/Box";
import { useRef } from "react";
import MainNavButton from "./MainNavButton";
import { MainNavLink } from "./types";

// Data for main navigation
const mainNavLinks: MainNavLink[] = [
  {
    id: "promo-zone",
    label: "Promo Zone",
    icon: "/images/brand_awareness.svg",
  },
  {
    id: "ask-community",
    label: "Ask the Community",
    icon: "/images/indeterminate_question_box.svg",
  },
  {
    id: "women-in-business",
    label: "Women in Business",
    icon: "/images/face_4.svg",
  },
  {
    id: "next-gen-hustle",
    label: "Next Gen Hustle",
    icon: "/images/rocket_launch.svg",
  },
  {
    id: "car-connect",
    label: "Car Connect",
    icon: "/images/airport_shuttle.svg",
  },
  {
    id: "creative-media",
    label: "Creative Media Exchange",
    icon: "/images/Palette.svg",
  },
  {
    id: "startup-diaries",
    label: "Startup Diaries",
    icon: "/images/partner_exchange.svg",
  },
];

interface MainNavigationProps {
  selectedMainNavLink: string;
  onMainNavLinkChange: (link: string) => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({
  selectedMainNavLink,
  onMainNavLinkChange,
}) => {
  const mainNavRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={mainNavRef}
      display="flex"
      alignItems="center"
      style={{
        gap: "12px",
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        paddingBottom: "20px",
        marginBottom: "20px",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      {mainNavLinks.map((link) => (
        <MainNavButton
          key={link.id}
          link={link}
          isActive={selectedMainNavLink === link.id}
          onClick={() => onMainNavLinkChange(link.id)}
        />
      ))}
    </Box>
  );
};

export default MainNavigation;
