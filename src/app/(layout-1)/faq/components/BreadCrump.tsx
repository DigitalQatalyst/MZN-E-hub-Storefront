import Typography from "@component/Typography";
import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const BreadCrump = ({
  mainarticle,
  currentitem,
}: {
  mainarticle: any;
  currentitem: any;
}) => {
  return (
    <div>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
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
          <Link href="/support">
            <Typography
              variant="h6"
              fontWeight={500}
              color="#7367F0"
              fontSize="15px"
              mb={1}
            >
              Support
            </Typography>
          </Link>
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
          <Link
            href={{
              pathname: `/support/allarticles/${mainarticle?.id}`,
              query: {
                itemid: mainarticle?.id,
              },
            }}
          >
            <Typography
              variant="h6"
              fontWeight={500}
              color="#7367F0"
              fontSize="15px"
              mb={1}
            >
              {mainarticle?.title}
            </Typography>
          </Link>
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
            {currentitem}
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
