"use client";
import Card from "@component/Card";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography, { H5 } from "@component/Typography";
import { FaRegEdit } from "react-icons/fa";

export default function SidebarCard({ firmData }: { firmData: any }) {
  return (
    <Card p="20px" height="fit-content">
      <FlexBox justifyContent="space-between" alignItems="center" mb="20px">
        <Typography fontSize="16px" fontWeight="600">Business Profile</Typography>
        <FaRegEdit size={16} color="#888" style={{ cursor: "pointer" }} />
      </FlexBox>

      <Box width="48px" height="48px" bg="#0030E3" borderRadius="6px" mb="12px" display="flex" alignItems="center" justifyContent="center">
        <Typography fontSize="20px" fontWeight="700" color="#fff">ft</Typography>
      </Box>

      <H5 my="0px" fontSize="18px">{firmData.name}</H5>
      <Typography fontSize="14px" color="text.hint" mb="16px">{firmData.businessType}</Typography>

      {[
        { label: "Stage", value: firmData.stage },
        { label: "Industry", value: firmData.industry },
        { label: "Location", value: firmData.location },
        { label: "Currency", value: firmData.currency },
        { label: "Founded", value: firmData.founded },
        { label: "Employees", value: firmData.employees },
        { label: "Incorporation Type", value: firmData.incorporationType },
        { label: "Website", value: firmData.website },
      ].map((item, idx) => (
        <Box key={idx} py="10px" borderBottom={idx < 7 ? "1px solid #f0f0f0" : "none"} display="flex" justifyContent="space-between">
          <Typography fontSize="14px" color="text.hint">{item.label}</Typography>
          <Typography fontSize="14px" style={{ wordBreak: "break-word" }}>{item.value}</Typography>
        </Box>
      ))}
    </Card>
  );
}
