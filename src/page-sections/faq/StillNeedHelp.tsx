import Grid from "@component/grid/Grid";
import Typography from "@component/Typography";
import Box from "@component/Box"; // Replace MUI Box
import Container from "@component/Container"; // Replace MUI Container
import { Button } from "@component/buttons"; // Replace MUI Button
import React from "react";

const StillNeedHelp: React.FC = () => {
  return (
    <Box
      width="100%"
      minHeight="30vh"
      backgroundColor="#F8F7FA"
      py="3rem"
      display="flex"
      alignItems="start"
      justifyContent="start"
    >
      <Container maxWidth="lg">
        <Typography
          fontSize="24px"
          fontWeight="500"
          color="#434050"
          textAlign="center"
          mb={2}
        >
          Still Need Help?
        </Typography>
        <Box>
          <Typography
            fontSize="16px"
            fontWeight="400"
            color="#6B6778"
            textAlign="center"
          >
            Our specialists are always hapy to help.
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight="400"
            color="#6B6778"
            textAlign="center"
            mb={4}
          >
            Contact us during standard business hours or email us 24/7,and we'll
            get back to you.
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ gap: "16px" }}
        >
          <Button
            variant="outlined"
            style={{
              backgroundColor: "transparent",
              color: "#0030E3",
              borderColor: "#0030E3",
              fontSize: "15px",
              fontWeight: "400",
              textTransform: "none",
              boxShadow: "none",
            }}
          >
            Visit our Community
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#0030E3",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "400",
              textTransform: "none",
              boxShadow: "none",
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default StillNeedHelp;