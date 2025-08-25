"use client";

import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { H2 } from "@component/Typography";
import CommunityCard from "./CommunityCard";
import { CommunityCard as CommunityCardType } from "./types";

interface CommunityGridProps {
  title: string;
  communities: CommunityCardType[];
  onJoinCommunity?: (id: string) => void;
  showMoreButton?: boolean;
  onShowMore?: () => void;
}

const CommunityGrid: React.FC<CommunityGridProps> = ({
  title,
  communities,
  onJoinCommunity,
  showMoreButton = true,
  onShowMore,
}) => {
  return (
    <Box mb="40px">
      <H2
        fontSize="14px"
        fontWeight="600"
        color="#615B5B"
        mb="10px"
        fontFamily="Inter, sans-serif"
      >
        {title}
      </H2>

      <Box
        display="grid"
        style={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(460px, 100%), 1fr))",
          gap: "20px",
        }}
        mb="20px"
      >
        {communities.map((community) => (
          <CommunityCard
            key={community.id}
            community={community}
            onJoin={onJoinCommunity}
          />
        ))}
      </Box>

      {showMoreButton && (
        <Box display="flex" justifyContent="center">
          <Button
            onClick={onShowMore}
            color="primary"
            size="medium"
            variant="contained"
            style={{
              color: "white",
              transition: "all 0.2s ease",
              backgroundColor: "#0078D4",
              padding: "10px",
              fontSize: "12px",
              fontWeight: "600",
              borderRadius: "8px",
            }}
          >
            Show more
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CommunityGrid;
