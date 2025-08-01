import React from "react";
import { Box } from "@mui/material";
import { ChevronRight } from "lucide-react";
import Typography from "@component/Typography";

const MicroFinanceLOan = () => {
  return (
    <Box
      style={{
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "white",
        borderRadius: "20px",
        border: "1px solid #E5EAF1",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ChevronRight size={20} color="#000000" />
        <Typography fontSize="16px" fontWeight="500">
          Microfinance Loan
        </Typography>
      </Box>
    </Box>
  );
};

export default MicroFinanceLOan;
