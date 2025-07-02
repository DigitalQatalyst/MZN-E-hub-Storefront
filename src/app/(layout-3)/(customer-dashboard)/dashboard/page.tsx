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
import ProfileCompletionCard from "./ProfileCompletionCard";

export default function Dashboard() {
  // const user = await api.getUser();

  return (
    <Fragment>
      <Box style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <Grid container spacing={3}>
          {/* Top Row - Profile Completion Card */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ProfileCompletionCard completionPercentage={50} />
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