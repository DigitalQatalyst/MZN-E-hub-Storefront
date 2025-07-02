"use client"

import { Fragment } from "react";
import { format } from "date-fns";

import api from "@utils/__api__/users";

import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { EditProfileButton } from "@sections/customer-dashboard/profile";
import { ServiceRequestsTrendCard } from "./ServiceRequestsTrendCard";
import { ActivityOverviewCard } from "./ActivityOverviewCard";

export default function Dashboard() {
  // const user = await api.getUser();

  // Mock data for the cards
  const activityData = {
    totalServices: 14,
    approved: 8,
    underReview: 4,
    rejected: 2,
    approvalRate: 85
  };

  return (
    <Fragment>
      <Box style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <Grid container spacing={3}>
          {/* Top Row - Profile Completion Card */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card
              p="24px"
              ml="-36px"
              mb="20px"
              borderRadius={12}
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                color: 'white',
                width: '556px',
                height: '240px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <FlexBox justifyContent="space-between" alignItems="flex-start" height="100%">
                <Box>
                  <H3 color="white" mb="8px" fontWeight="600">
                    My Profile Completion
                  </H3>
                  <Typography fontSize="14px" color="rgba(255,255,255,0.8)" mb="16px">
                    Access a wider range of tailored services,<br />
                    and personalized support.
                  </Typography>
                  <Typography 
                    fontSize="14px" 
                    color="white" 
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Complete your profile &gt;
                  </Typography>
                </Box>
                
                <Box style={{ position: 'relative' }}>
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="white"
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 50 * 0.6} ${2 * Math.PI * 50}`}
                      strokeDashoffset={2 * Math.PI * 50 * 0.25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <Box 
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center'
                    }}
                  >
                    <Typography fontSize="32px" fontWeight="bold" color="white">60%</Typography>
                    <Typography fontSize="12px" color="rgba(255,255,255,0.8)">Complete</Typography>
                  </Box>
                </Box>
              </FlexBox>
            </Card>
          </Grid>

          {/* Top Row - Quick Access Card */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card 
              p="24px"
              ml="81px"
              mb="20px"
              borderRadius={12}
              style={{ 
                width: '556px',
                height: '240px',
                border: '1px solid #e5e7eb'
              }}
            >
              <H5 mb="8px" fontWeight="600">My Quick Access</H5>
              <Typography fontSize="14px" color="text.hint" mb="20px">
                Links to tasks that need your attention.
              </Typography>
              
              <FlexBox flexDirection="column">
                <FlexBox 
                  alignItems="center" 
                  justifyContent="space-between"
                  p="12px 16px"
                  borderRadius={8}
                  style={{ backgroundColor: '#f9fafb', cursor: 'pointer', marginBottom: '16px' }}
                >
                  <FlexBox alignItems="center">
                    <Box 
                      style={{ 
                        width: '32px', 
                        height: '32px', 
                        backgroundColor: '#e5e7eb', 
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px'
                      }}
                    >
                      📄
                    </Box>
                    <Box>
                      <Typography fontSize="14px" fontWeight="500">3 Draft Service Requests</Typography>
                      <Typography fontSize="12px" color="text.hint">Resume where you left off</Typography>
                    </Box>
                  </FlexBox>
                  <Typography fontSize="18px" color="text.hint">&gt;</Typography>
                </FlexBox>

                <FlexBox 
                  alignItems="center" 
                  justifyContent="space-between"
                  p="12px 16px"
                  borderRadius={8}
                  style={{ backgroundColor: '#f9fafb', cursor: 'pointer' }}
                >
                  <FlexBox alignItems="center">
                    <Box 
                      style={{ 
                        width: '32px', 
                        height: '32px', 
                        backgroundColor: '#e5e7eb', 
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px'
                      }}
                    >
                      📋
                    </Box>
                    <Box>
                      <Typography fontSize="14px" fontWeight="500">4 Services Under Review</Typography>
                      <Typography fontSize="12px" color="text.hint">Track Progress</Typography>
                    </Box>
                  </FlexBox>
                  <Typography fontSize="18px" color="text.hint">&gt;</Typography>
                </FlexBox>
              </FlexBox>
            </Card>
          </Grid>

          {/* Bottom Row - Activity Overview Card */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ActivityOverviewCard />
          </Grid>

          {/* Bottom Row - Service Requests Trend Card with ApexCharts */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ServiceRequestsTrendCard />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}