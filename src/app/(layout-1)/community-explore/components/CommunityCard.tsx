"use client";

import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import { H3 } from "@component/Typography";
import { CommunityCardProps } from "./types";

const CommunityCard: React.FC<CommunityCardProps> = ({ community, onJoin }) => {
  const handleJoin = () => {
    if (onJoin) {
      onJoin(community.id);
    }
  };

  return (
    <Card
      p="20px"
      borderRadius="10px"
      border="1px solid #eee"
      bg="white"
      hoverEffect={true}
      style={{
        transition: "all 0.2s ease",
        minWidth: 0,
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        style={{ gap: "15px" }}
        mb="15px"
        minWidth={0}
      >
        <Box
          as="img"
          src={community.avatar}
          alt={`${community.title} Avatar`}
          width="50px"
          height="50px"
          borderRadius="50%"
          bg="#eee"
          style={{
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <Box flexGrow={1} minWidth={0} style={{ overflow: "hidden" }}>
          <H3
            fontSize="12px"
            color="#6E6E6E"
            m="0 0 4px 0"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              hyphens: "auto",
              lineHeight: "auto",
            }}
          >
            {community.title}
          </H3>
          <Box
            as="p"
            fontSize="10px"
            color="#6E6E6E"
            m="0"
            fontFamily="Inter, sans-serif"
          >
            {community.members}
          </Box>
        </Box>
        <Button
          aria-label={`Join ${community.title}`}
          onClick={handleJoin}
          variant="contained"
          size="small"
          style={{
            padding: "8px 10px",
            fontSize: "10px",
            fontWeight: "600",
            borderRadius: "8px",
            minWidth: "auto",
            height: "normal",
            flexShrink: 0,
            color: "#5C5C5C",
            backgroundColor: "#EFF6FF",
          }}
        >
          Join
        </Button>
      </Box>
      <Box
        as="p"
        fontSize="12px"
        color="#6E6E6E"
        lineHeight="normal"
        fontWeight={"400"}
        m="0"
        fontFamily="Inter, sans-serif"
      >
        {community.description}
      </Box>
    </Card>
  );
};

export default CommunityCard;
