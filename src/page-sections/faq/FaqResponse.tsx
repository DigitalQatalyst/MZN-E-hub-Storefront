import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { Box, Container, InputAdornment } from "@mui/material";
import BreadCrump from "app/(layout-1)/faq/components/BreadCrump";
import React from "react";
import { BsChevronRight, BsSearch } from "react-icons/bs";

const relatedarticles = [
  {
    id: 1,
    title: "What is the Opportunities Marketplace?",
  },
  {
    id: 2,
    title: "How do I find and apply for opportunities?",
  },
  {
    id: 3,
    title: "What do the opportunity tags mean?",
  },
  {
    id: 4,
    title: "How to check your eligibility for...?",
  },
  {
    id: 5,
    title: "How to save an opportunity to your dashboard",
  },
  {
    id: 6,
    title: "What happens after I apply?",
  },
];

const FaqResponse = ({ articledata }: { articledata: any }) => {
  const { title, description } = articledata;
  console.log(title, description);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "60vh",
        backgroundColor: "#ffffff",
        py: "5rem",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              maxWidth: "70%",
            }}
          >
            <BreadCrump />
            <Box>
              <Typography
                fontSize="24px"
                fontWeight="500"
                color="#4A4458"
                textAlign="start"
                mb={2}
              >
                {title}
              </Typography>
              <Typography
                fontSize="15px"
                fontWeight="500"
                color="#2F2B3DB2"
                textAlign="start"
                mb={2}
              >
                Updated - 1 month ago
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
                gap: 4,
              }}
            >
              <Typography
                fontSize="15px"
                fontWeight="500"
                color="#2F2B3DB2"
                textAlign="start"
                mb={2}
              >
                {description}
              </Typography>

              {/* image */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <img width="100%" src="../images/faqsample.png" alt="" />
              </Box>
              {/* 
              <Typography
                fontSize="15px"
                fontWeight="500"
                color="#2F2B3DB2"
                textAlign="start"
                mb={2}
              >
                Use filters to Narrow Your Search: Once you're on the
                marketplace page, you can refine your results using filters.
                These may include your business stage (e.g. Concept, Growth,
                Maturity, Turnaround), opportunity type (like tenders, grants,
                or partnerships), sector (such as retail, tech, or
                agri-business), and location. The filters help you quickly zero
                in on listings that are most relevant to your business, saving
                time and surfacing the most strategic options for your profile.
              </Typography>
              <Typography
                fontSize="15px"
                fontWeight="500"
                color="#2F2B3DB2"
                textAlign="start"
                mb={2}
              >
                View Opportunity Details. Clicking on a listing opens up its
                detail view, where you’ll find all relevant information: who is
                offering the opportunity, any eligibility criteria, submission
                deadlines, required documents, and the value or benefits your
                business could gain. Some listings may also include FAQs,
                guidance documents, or links to partner background profiles to
                support your decision-making.
              </Typography>
              <Typography
                fontSize="15px"
                fontWeight="500"
                color="#2F2B3DB2"
                textAlign="start"
                mb={2}
              >
                If the opportunity is hosted directly on the platform, you can
                click the “Apply” button to begin the process immediately. Some
                listings may redirect you to a trusted partner’s application
                page—in these cases, you’ll see a notification before leaving
                the platform. For logged-in users, you also have the option to
                save the opportunity to your dashboard for future action or
                tracking.
              </Typography> */}
            </Box>
          </Box>
          <Box
            sx={{
              width: "30%",
              backgroundColor: "#fff",
              borderRadius: "9px",
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search"
              style={{ width: "350px", borderRadius: "7px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BsSearch size={20} color="black" />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor: "#2F2B3D0F",
                mb: 1,
                mt: 2,
                borderRadius: "9px",
                padding: "0.3rem",
              }}
            >
              <Typography fontSize="14px" color="#6B6778" mb={2}>
                Articles in this section
              </Typography>
            </Box>

            {relatedarticles?.map((article) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  mb: 1,
                  padding: "0.3rem",
                }}
              >
                <Typography
                  fontSize="14px"
                  color="#6B6778"
                  mb={2}
                  key={article.id}
                >
                  {article.title}
                </Typography>
                <BsChevronRight size={15} color="black" />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FaqResponse;
