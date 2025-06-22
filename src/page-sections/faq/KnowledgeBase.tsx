import Grid from "@component/grid/Grid";
import Typography from "@component/Typography";
import { Box, Container, Button } from "@mui/material";
import React from "react";
import { articles, knowledgeitems } from "./utils";
import { FaUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { BsArrowRight, BsChevronRight } from "react-icons/bs";

const KnowledgeBase: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "60vh",
        backgroundColor: "#F8F7FA",
        py: "5rem",
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
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
          Your Knowledge Base
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {knowledgeitems?.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  padding: "2rem",
                  minHeight: "400px",
                  height: "100%",
                  borderRadius: "8px",
                  position: "relative",
                  border: "1px solid #E0E0E0",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                }}
              >
                {/* card heading */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: "0.5rem",
                    mb: 2,
                  }}
                >
                  {/* icons */}
                  <Box
                    sx={{
                      backgroundColor: "#EFEAFF",
                      color: "#5C4BFF",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "12px",
                      textTransform: "none",
                      boxShadow: "none",
                      padding: "0.5rem",
                      ":hover": {
                        backgroundColor: "#ded9ff",
                      },
                    }}
                  >
                    {item.icon}
                  </Box>
                  {/* heading */}
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="#4A4458"
                    fontSize="17px"
                    mb={1}
                  >
                    {item.title}
                  </Typography>
                </Box>

                {/* card heading ends here */}

                {/* card content */}

                {item.articles.map((article) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      mb: 2,
                    }}
                  >
                    <Typography
                      fontSize="14px"
                      color="#6B6778"
                      mb={2}
                      key={article}
                    >
                      {article}
                    </Typography>
                    <BsChevronRight size={15} color="black" />
                  </Box>
                ))}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                      fontSize="14px"
                      fontWeight="600"
                      color="#0030E3"
                      mb={2}
                    >
                      See all {item?.articles?.length + 4} Articles
                    </Typography>
                    <Box>
                      <BsArrowRight size={20} color="#0030E3" />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default KnowledgeBase;
