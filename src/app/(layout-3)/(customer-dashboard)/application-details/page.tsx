import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Typography from "@component/Typography";
import {
  ChevronDown,
  ChevronLeft,
  Image,
  PhoneCall,
  Search,
  User,
  VideoIcon,
} from "lucide-react";
import React, { Fragment } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { chats } from "./constants";
import { Input } from "@mui/material";
import { FaMicrophone } from "react-icons/fa";
import PaymentSchedule from "./components/PaymentSchedule";
import ApplicationTabs from "./components/ApplicationTabs";
import MicroFinanceLOan from "./components/MicroFinanceLOan";

const page = () => {
  return (
    <Fragment>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          gap: "12px",
          padding: "20px",
        }}
      >
        <button
          style={{
            border: 0,
            padding: "8px",
            borderRadius: "6px",
            backgroundColor: "#CCD7FF",
          }}
        >
          <Typography fontSize="16px" color="#264FE8" fontWeight="500">
            Financial Insights
          </Typography>
        </button>

        <button
          style={{
            border: 0,
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Typography fontSize="16px" color="black" fontWeight="500">
            Non-Financial Insights
          </Typography>
        </button>
      </Box>
      <Box>
        <ApplicationTabs />
      </Box>
      {/* Financial Summary Section */}
      <Box style={{ padding: "20px" }}>
        <Grid container spacing={4} paddingX={4}>
          {/* Left Side: Loan Details */}
          <Grid item xs={12} md={8}>
            <Box
              style={{
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #E5EAF1",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <ChevronDown size={20} color="#000000" />
                <Typography fontSize="18px" fontWeight="600">
                  Financing Business Operating Capital Loan
                </Typography>
              </Box>

              {/* Progress and Info */}
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {/* Circular Progress */}
                <Box>
                  <Box
                    style={{
                      width: "140px",
                      height: "140px",
                      borderRadius: "50%",
                      background: "#F4F7FE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Typography
                      fontSize="20px"
                      fontWeight="600"
                      color="#264FE8"
                    >
                      30%
                    </Typography>
                  </Box>

                  <Typography
                    marginTop="12px"
                    fontSize="14px"
                    color="#555"
                    fontWeight="300"
                  >
                    <strong>750,000 / 2,500,000 AED</strong>
                  </Typography>
                </Box>

                {/* Loan Info */}
                <Box style={{ maxWidth: "65%" }}>
                  <Typography fontSize="16px" fontWeight="500">
                    Loan Details
                  </Typography>
                  <Typography color="#555" fontSize="14px" marginTop="6px">
                    Financing for working capital to support day-to-day business
                    operations.
                  </Typography>
                </Box>
              </Box>

              {/* Repayment Schedule */}
              <Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography fontWeight="500">
                    Loan repayment schedule
                  </Typography>
                  <Typography
                    color="#264FE8"
                    fontSize="14px"
                    style={{ cursor: "pointer" }}
                  >
                    Download Statement
                  </Typography>
                </Box>

                {/* Table Head */}
                <PaymentSchedule />
              </Box>
            </Box>
            <MicroFinanceLOan />
          </Grid>

          {/* Right Side: Overview and Updates */}
          <Grid item xs={12} md={4}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* Overview Card */}
              <Box
                style={{
                  border: "1px solid #E5EAF1",
                  borderRadius: "16px",
                  background: "#fff",
                  overflow: "hidden",
                }}
              >
                <Box
                  style={{
                    border: "1px solid #E5EAF1",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    background: "#fff",
                    padding: "10px",
                  }}
                >
                  <Typography fontWeight="600" fontSize="16px">
                    Business Loans Overview
                  </Typography>
                  <Box style={{ marginTop: "12px" }}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <Box
                        style={{
                          width: "100%",
                          borderRight: "1px solid lightgray",
                        }}
                      >
                        <Typography fontSize="11px" fontWeight="600">
                          Total Capital Obtained:
                        </Typography>
                        <Typography fontSize="14px">AED. 500,000</Typography>
                      </Box>
                      <Box
                        style={{
                          width: "100%",
                          padding: "0 8px",
                        }}
                      >
                        <Typography fontSize="11px" fontWeight="600">
                          Outstanding Balance:
                        </Typography>
                        <Typography fontSize="14px">AED. 500,000</Typography>
                      </Box>
                    </Box>

                    <Box
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <Typography fontSize="11px" fontWeight="600">
                        Overall Repayment Progress:
                      </Typography>
                      <Typography fontSize="14px">64%</Typography>
                    </Box>
                    <Box>
                      <Typography fontSize="11px" fontWeight="600">
                        Overall Interest Rate:
                      </Typography>
                      <Typography fontSize="14px">0%</Typography>
                    </Box>
                  </Box>
                </Box>
                {/* Financial Summary Section */}

                {/* Updates Card */}
                <Box
                  style={{
                    border: "1px solid #E5EAF1",
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    background: "#fff",
                    padding: "20px",
                  }}
                >
                  <Typography fontWeight="600" fontSize="16px">
                    Updates
                  </Typography>
                  <Typography fontSize="14px" style={{ marginTop: "10px" }}>
                    Next Payment Due in 3 days:
                    <strong> AED. 12,000</strong>
                  </Typography>
                  <Typography
                    color="#264FE8"
                    fontSize="14px"
                    style={{ cursor: "pointer", marginBottom: "12px" }}
                  >
                    Repay Now
                  </Typography>
                  <Typography fontSize="14px">
                    Overdue Payment:
                    <strong> AED. 15,000</strong>
                  </Typography>
                  <Typography
                    color="#264FE8"
                    fontSize="14px"
                    style={{ cursor: "pointer" }}
                  >
                    Repay Now
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* chat box */}
    </Fragment>
  );
};

export default page;
