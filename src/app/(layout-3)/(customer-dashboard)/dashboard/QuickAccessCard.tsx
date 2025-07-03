import React from "react";

import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Typography, { H5 } from "@component/Typography";
import { ChevronRight } from "lucide-react";

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
  const quickAccessItems: QuickAccessItem[] = [
    {
      icon: "📄",
      title: `${draftCount} Draft Service Requests`,
      subtitle: "Resume where you left off",
      count: draftCount,
      onClick: onDraftClick,
    },
    {
      icon: "📋",
      title: `${reviewCount} Services Under Review`,
      subtitle: "Track Progress",
      count: reviewCount,
      onClick: onReviewClick,
    },
  ];

  return (
    <Card
      p="24px"
      ml="81px"
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
            p="12px 16px"
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
                {item.icon}
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
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#A8AAAE29",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
                >
                <Typography fontSize="18px" color="#A8AAAE" display={"flex"} alignItems="center" justifyContent="center">
                    <ChevronRight />
                </Typography>
            </Box>
          </FlexBox>
        ))}
      </FlexBox>
    </Card>
  );
};

export default QuickAccessCard;