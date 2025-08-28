import Grid from "@component/grid/Grid";
import Typography from "@component/Typography";
import { Box, Container, Button } from "@mui/material";
import React from "react";
import { articles, knowledgeitems } from "./utils";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoHelp, IoHomeOutline, IoLockOpenOutline } from "react-icons/io5";
import {
  BsArrowRight,
  BsChevronRight,
  BsCurrencyDollar,
  BsTags,
} from "react-icons/bs";
import Link from "next/link";
import { knowledgedata } from "./data";

const iconMap = {
  FaUser: <FaUser />,
  FaHome: <FaHome />,
  FaShoppingCart: <FaShoppingCart />,
  IoHomeOutline: <IoHomeOutline />,
  IoHelp: <IoHelp />,
  BsArrowRight: <BsArrowRight />,
  BsChevronRight: <BsChevronRight />,
  BsCurrencyDollar: <BsCurrencyDollar />,
  BsTags: <BsTags />,
  IoLockOpenOutline: <IoLockOpenOutline />,
};

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
          {knowledgedata?.map((item) => (
            <Grid item xs={12} sm={12} md={4} key={item.id}>
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
                    {iconMap[item.icon] || <IoHelp />}
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

                {item.articles.map((article, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      mb: 2,
                    }}
                  >
                    {/* <Link
                     href={{
                      pathname: `/faq/${slugify(article.title)}`,
                      query: { description: article.description },
                    }}
                     }> */}
                    <Link
                      href={{
                        pathname: `/faq/${item?.id}/`,
                        query: {
                          articleid: article.id,
                          itemid: item.id,
                        },
                      }}
                    >
                      <Typography
                        fontSize="14px"
                        color="#6B6778"
                        mb={2}
                        key={article.title}
                      >
                        {article.title}
                      </Typography>
                    </Link>
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
                    {/* <Link href="/support/allarticles/1"> */}
                    <Link
                      href={{
                        pathname: `/support/allarticles/${item.id}`,
                        query: {
                          itemid: item.id,
                        },
                      }}
                    >
                      <Typography
                        fontSize="14px"
                        fontWeight="600"
                        color="#0030E3"
                        mb={2}
                      >
                        See all {item?.articles?.length} Articles
                      </Typography>
                    </Link>
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
