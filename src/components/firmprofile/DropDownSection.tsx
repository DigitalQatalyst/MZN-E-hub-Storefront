"use client";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import Box from "@component/Box";
import { Divider } from "@mui/material";
import { ChevronDown, ChevronUp, SquarePen } from "lucide-react";

type Props = {
  id: number | string;
  title: string;
  expanded: boolean;
  onToggle: (id: number | string) => void;
  children: React.ReactNode;
};

export default function DropdownSection({
  id,
  title,
  expanded,
  onToggle,
  children,
}: Props) {
  return (
    <Card p="20px" mb="12px">
      <FlexBox
        alignItems="center"
        justifyContent={"space-between"}
        style={{ cursor: "pointer" }}
        onClick={() => onToggle(id)}
      >
        <Box display={"flex"} alignItems={"center"} style={{ gap: "12px" }}>
          {expanded ? (
            <ChevronUp size={20} color="#888" />
          ) : (
            <ChevronDown size={20} color="#888" />
          )}
          <Typography fontSize="16px" fontWeight="500">
            {title}
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          {expanded ? <SquarePen size={20} color="#888" /> : undefined}
        </Box>
      </FlexBox>
      {expanded && (
        <>
          <Divider sx={{ my: 2 }} />
          {children}
        </>
      )}
    </Card>
  );
}
