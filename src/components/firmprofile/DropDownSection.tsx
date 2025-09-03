"use client";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { Divider } from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  id: number | string;
  title: string;
  expanded: boolean;
  onToggle: (id: number | string) => void;
  children: React.ReactNode;
};

export default function DropdownSection({ id, title, expanded, onToggle, children }: Props) {
  return (
    <Card p="20px" mb="12px">
      <FlexBox justifyContent="space-between" alignItems="center" style={{ cursor: "pointer" }} onClick={() => onToggle(id)}>
        <Typography fontSize="16px" fontWeight="500">{title}</Typography>
        {expanded ? <ChevronUp size={20} color="#888" /> : <ChevronDown size={20} color="#888" />}
      </FlexBox>
      {expanded && <>
        <Divider sx={{ my: 2 }} />
        {children}
      </>}
    </Card>
  );
}
