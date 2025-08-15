import TextField from "@component/text-field";
import Typography from "@component/Typography";
import Box from "@component/Box";
import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchSection = () => {
  const VF_PROJECT_ID = "6849bea9894655c0d600d259"; // your project ID
  const VF_VERSION = "production"; // or 'development'

  const assistantConfig = {
    title: "My Assistant",
    description: "Here to help!",
    // optional: image URL or brand color, etc.
  };
  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="30vh"
        backgroundColor="#F4F3FE"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width="100%"
        >
          <Typography
            fontSize="24px"
            fontWeight="500"
            color="#0030E3"
            variant="h2"
          >
            Hello, how can we help?
          </Typography>

          <Box
            display="grid"
            style={{ placeContent: "center" }}
            width="100%"
            py="1rem"
          >
            <div style={{ position: "relative" }}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search"
                style={{ width: "350px", borderRadius: "7px", paddingRight: "40px" }}
              />
              <div style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none"
              }}>
                <BsSearch size={20} color="black" />
              </div>
            </div>
          </Box>

          <Typography fontSize="15px" color="#6B6778" variant="p">
            Explore help articles, or reach out to a specialist.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default SearchSection;