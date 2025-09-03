"use client";
import Card from "@component/Card";
import Typography from "@component/Typography";
import { Divider } from "@mui/material";

export default function RevenueFinance() {
  return (
    <>
      {[
        { id: 10, title: "General Profile" },
        { id: 11, title: "Business Registration" },
        { id: 12, title: "Classification & Stage" },
        { id: 13, title: "Referral Source" },
      ].map((item) => (
        <Card key={item.id} p="20px" mb="12px">
          <Typography fontSize="16px" fontWeight="500">{item.title}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography fontSize="14px" color="text.hint">Content for {item.title} will go here...</Typography>
        </Card>
      ))}
    </>
  );
}
