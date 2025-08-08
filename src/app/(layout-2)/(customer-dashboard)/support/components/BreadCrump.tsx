import Typography from "@component/Typography";
import { Box } from "@mui/material";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const BreadCrump = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={500}
            color="#7367F0"
            fontSize="15px"
            mb={1}
          >
            Support
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={500}
            color="#4A4458"
            fontSize="15px"
            mb={1}
          >
            /
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={500}
            color="#7367F0"
            fontSize="15px"
            mb={1}
          >
            Opportunities Marketplace
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography fontSize="15px" fontWeight="500" color="#0030E3" mb={2}>
            /
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={500}
            color="#4A4458"
            fontSize="15px"
            mb={1}
          >
            Finding & Applying for Opportunities
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        ></Box>
      </Box>
    </div>
  );
};

export default BreadCrump;
