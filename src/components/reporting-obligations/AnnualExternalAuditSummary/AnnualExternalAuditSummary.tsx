"use client";

import { Box, Typography, Button } from "@mui/material";

const AnnualExternalAuditSummary = () => {
  return (
    <div style={{ marginLeft: "40px", width: "calc(98% - 40px)" }}>
      <Box
        sx={{
          p: 2,
          bgcolor: "#FFFFFF",
          borderRadius: 1,
          // boxShadow: 1,
          mb: 4,
        }}
      >
        <Typography
          sx={{
            color: "#4B465C",
            fontSize: "18px",
            fontWeight: 500,
            mb: 1,
          }}
        >
          Annual External Audit Summary
        </Typography>
        <Typography
          sx={{
            color: "#4B465C",
            fontSize: "15px",
            mb: 1,
          }}
        >
          Due: Dec 10, 2025
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "#616161",
              textTransform: "none",
              fontSize: "12px",
              // "&:hover": {
              //   color: "#4B5563",
              // },
            }}
          >
            View
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgba(0, 122, 255, 0.16)",
              color: "#675DD8",
              textTransform: "none",
              fontSize: "12px",
              padding: "4px 8px",
              "&:hover": {
                backgroundColor: "#60A5FA",
              },
            }}
          >
            Upcoming
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AnnualExternalAuditSummary;
