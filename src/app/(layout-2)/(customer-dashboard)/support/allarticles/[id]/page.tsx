"use client";
import Grid from "@component/grid/Grid";
import { Box, Button, Typography } from "@mui/material";
import { knowledgedata } from "@sections/faq/data";
import SearchSection from "@sections/faq/SearchSection";
import { ShoppingBag, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const page = () => {
  const searchParams = useSearchParams();
  const itemid = searchParams.get("itemid");
  console.log("itemid", itemid);

  // get article from knowledge articles where id matches current itemid
  const article = knowledgedata?.find((articles) => articles.id === itemid);
  console.log("article", article);
  const articles = article?.articles;

  const currentarticles = [
    {
      id: 1,
      icon: <ShoppingBag size={20} color="#0030E3" />,
      title: "How to register your business",
    },
    {
      id: 2,
      icon: <ShoppingBag size={20} color="#0030E3" />,
      title: "How to register your business",
    },
    {
      id: 3,
      icon: <ShoppingBag size={20} color="#0030E3" />,
      title: "How to register your business",
    },
    {
      id: 4,
      icon: <ShoppingBag size={20} color="#0030E3" />,
      title: "How to register your business",
    },
    {
      id: 5,
      icon: <ShoppingBag size={20} color="#0030E3" />,
      title: "How to register your business",
    },
    {
      id: 6,
      icon: <ShoppingBag size={20} color="#0030E3" />,
      title: "How to register your business",
    },
  ];
  return (
    <Box
      sx={{
        backgroundColor: "#F8F7FA",
        height: "100%",
      }}
    >
      <SearchSection />
      <Box
        sx={{
          paddingTop: "3rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            fontSize="24px"
            fontWeight="600"
            color="#2F2B3DE5"
            textAlign="center"
            mb={4}
          >
            {article?.title} Articles
          </Typography>
        </Box>
      </Box>

      {/* cards */}
      {/* grid with three cards per row */}
      <Box
        sx={{
          paddingX: "2rem",
        }}
      >
        <Grid container spacing={4}>
          {articles?.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  flexDirection: "column",
                  backgroundColor: "#fff",
                  padding: "1rem",
                  minHeight: "250px",
                  borderRadius: "8px",
                  border: "1px solid #E0E0E0",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        padding: "1rem",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#7367F029",
                      }}
                    >
                      <ShoppingCartIcon size={20} color="#0030E3" />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <Typography fontSize="18px" color="#2F2B3DE5" mb={2}>
                      {article.title}
                    </Typography>
                  </Box>

                  <Link
                    href={{
                      pathname: `/faq/${itemid}`,
                      query: {
                        articleid: article.id,
                        itemid: itemid,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: 1,
                        cursor: "pointer",
                      }}
                    >
                      <Box>
                        <Typography fontSize="14px" color="#0030E3">
                          Read More
                        </Typography>
                      </Box>
                      <Box>
                        <BsArrowRight size={15} color="#0030E3" />
                      </Box>
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* load more button at center of page in a box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Button
          sx={{
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            backgroundColor: "#0030E3",
            color: "#fff",
            borderRadius: "4px",
            textTransform: "none",
            boxShadow: "none",
            ":hover": {
              backgroundColor: "#0030E3",
            },
          }}
        >
          Load More
        </Button>
      </Box>
    </Box>
  );
};

export default page;
