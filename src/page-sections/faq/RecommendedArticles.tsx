import Grid from "@component/grid/Grid";
import Typography from "@component/Typography";
import { Box, Container, Button } from "@mui/material";
import React from "react";
import { articles } from "./utils";

const RecommendedArticles = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "40vh",
        backgroundColor: "#FFFFFF",
        py: "5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          fontSize="24px"
          fontWeight="500"
          color="#4A4458"
          textAlign="center"
          mb={4}
        >
          Recommend Articles
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {articles?.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "#ffffff",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "2rem",
                  justifyContent: "center",
                  minHeight: "250px",
                  borderRadius: "9px",
                  border: "1px solid #E0E0E0",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Box sx={{ mb: 2 }}>{item.icon}</Box>

                {/* Add your icon here */}
                <Typography
                  variant="h6"
                  fontWeight={500}
                  color="#4A4458"
                  fontSize="18px"
                  mb={1}
                >
                  {item.title}
                </Typography>
                <Typography fontSize="14px" color="#6B6778" mb={2}>
                  {item.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#EFEAFF",
                    color: "#0030E3",
                    fontSize: "13px",
                    textTransform: "none",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: "#ded9ff",
                    },
                  }}
                >
                  Read More
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default RecommendedArticles;
