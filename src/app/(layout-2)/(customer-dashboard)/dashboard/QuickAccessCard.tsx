import React from "react";
import { useRouter } from "next/navigation";

import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Typography, { H5 } from "@component/Typography";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface QuickAccessItem {
  icon: string;
  title: string;
  subtitle: string;
  count: number;
  onClick?: () => void;
}

interface QuickAccessCardProps {
  draftCount?: number;
  reviewCount?: number;
  onDraftClick?: () => void;
  onReviewClick?: () => void;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  draftCount = 3,
  reviewCount = 4,
  onDraftClick,
  onReviewClick,
}) => {
  const router = useRouter();

  // Handle chevron click - redirect to non-financial-records page
  const handleChevronClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent parent item onClick from firing
    router.push('/non-financial-records');
  };

  const quickAccessItems: QuickAccessItem[] = [
    {
      icon: "/images/copy.svg",
      title: `${draftCount} Draft Service Requests`,
      subtitle: "Resume where you left off",
      count: draftCount,
      onClick: onDraftClick,
    },
    {
      icon: "/images/hourglass.svg",
      title: `${reviewCount} Services Under Review`,
      subtitle: "Track Progress",
      count: reviewCount,
      onClick: onReviewClick,
    },
  ];

  return (
    <Card
      p="24px"
      // ml="81px"
      mb="20px"
      borderRadius={12}
      style={{
        width: "556px",
        height: "240px",
        border: "1px solid #e5e7eb",
      }}
    >
      <H5 mb="8px" fontWeight="600">
        My Quick Access
      </H5>
      <Typography fontSize="14px" color="text.hint" mb="10px">
        Links to tasks that need your attention.
      </Typography>

      <FlexBox flexDirection="column">
        {quickAccessItems.map((item, index) => (
          <FlexBox
            key={index}
            alignItems="center"
            justifyContent="space-between"
            my="12px"
            borderRadius={8}
            onClick={item.onClick}
            style={{
              backgroundColor: "#ffffff",
              cursor: "pointer",
              marginBottom: index < quickAccessItems.length - 1 ? "16px" : "0",
            }}
          >
            <FlexBox alignItems="center">
              <Box
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#7367F014",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={16}
                  height={16}
                  style={{ 
                    objectFit: 'contain',
                    filter: 'brightness(0) saturate(100%) invert(41%) sepia(8%) saturate(1567%) hue-rotate(203deg) brightness(95%) contrast(84%)'
                  }}
                />
              </Box>
              <Box>
                <Typography fontSize="14px" fontWeight="500">
                  {item.title}
                </Typography>
                <Typography fontSize="12px" color="text.hint">
                  {item.subtitle}
                </Typography>
              </Box>
            </FlexBox>
            <Box
              onClick={handleChevronClick} // Add click handler for chevron navigation
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#A8AAAE29",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer", // Explicit cursor pointer for better UX
              }}
            >
              <Typography color="#A8AAAE" display={"flex"} alignItems="center" justifyContent="center">
                <ChevronRight size={16} />
              </Typography>
            </Box>
          </FlexBox>
        ))}
      </FlexBox>
    </Card>
  );
};

export default QuickAccessCard;