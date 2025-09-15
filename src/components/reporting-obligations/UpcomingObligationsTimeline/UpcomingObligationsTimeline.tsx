"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

const UpcomingObligationsTimeline = () => {
  return (
    <div style={{ marginLeft: "40px", marginBottom: "40px", width: "calc(98% - 40px)" }}>
      
        <Typography
        sx={{
            color: "#6B7280",
            fontSize: "16px",
            fontWeight: 500,
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
        }}
        >
        <Image src="/assets/images/icons/calendar_month.svg" alt="Calendar" width={20} height={20} />
        Upcoming Obligations Timeline
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: "#FFFFFF",
            borderRadius: 1,
            // boxShadow: 1,
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
            Bi-Annual Compliance Review
          </Typography>
          <Typography
            sx={{
              color: "#4B465C",
              fontSize: "15px",
              fontWeight: 400,
              mb: 1,
            }}
          >
            Due: Aug 01, 2025
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Box>
              <Button
                // variant="outlined"
                sx={{
                  color: "rgba(255, 159, 67, 0.80)",
                //   borderColor: "#F59E0B",
                  textTransform: "none",
                  fontSize: "12px",
                  padding: "4px 8px",
                  backgroundColor: "rgba(255, 159, 67, 0.25)",
                  "&:hover": {
                    borderColor: "#D97706",
                    backgroundColor: "rgba(251, 146, 60, 0.1)",
                  },
                }}
              >
                Action Required
              </Button>
              <Button
                variant="text"
                sx={{
                  color: "#616161",
                  textTransform: "none",
                  fontSize: "12px",
                  ml: 1,
                //   "&:hover": {
                //     color: "#4B5563",
                //   },
                }}
              >
                View
              </Button>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgba(255, 159, 67, 0.80)",
                color: "#FFFFFF",
                textTransform: "none",
                fontSize: "12px",
                padding: "4px 8px",
                // "&:hover": {
                //   borderColor: "#D97706",
                //   backgroundColor: "rgba(251, 146, 60, 0.1)",
                // },
              }}
            >
              Due Soon
            </Button>
          </Box>
        </Box>

    </div>
  );
};

export default UpcomingObligationsTimeline;
