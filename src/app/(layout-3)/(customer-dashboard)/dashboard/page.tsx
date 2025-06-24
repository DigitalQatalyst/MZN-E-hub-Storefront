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

export default async function Profile() {
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
            <Card 
              p="24px"
              ml="-36px"
              borderRadius={12}
              style={{
                width: '556px',
                height: '362px',
                border: '1px solid #e5e7eb'
              }}
            >
              <FlexBox justifyContent="space-between" alignItems="center" mb="16px">
                <Box>
                  <H5 mb="4px" fontWeight="600">My Activity Overview</H5>
                  <Typography fontSize="14px" color="text.hint">Last 30 Days</Typography>
                </Box>
                <Typography fontSize="18px" color="text.hint">⋯</Typography>
              </FlexBox>

              <FlexBox alignItems="flex-start" justifyContent="space-between" height="calc(100% - 60px)">
                <Box>
                  <H3 fontSize="48px" fontWeight="bold" mb="8px" color="text.primary">
                    {activityData.totalServices}
                  </H3>
                  <Typography fontSize="16px" color="text.hint" mb="24px">
                    Total Services Requested
                  </Typography>

                  <FlexBox flexDirection="column">
                    <FlexBox alignItems="center">
                      <Box 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          backgroundColor: '#f3f4f6', 
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '12px'
                        }}
                      >
                        💳
                      </Box>
                      <Box>
                        <Typography fontSize="14px" fontWeight="500">Approved</Typography>
                        <Typography fontSize="12px" color="text.hint">
                          {String(activityData.approved).padStart(2, '0')} Services
                        </Typography>
                      </Box>
                    </FlexBox>

                    <FlexBox alignItems="center" style={{ marginTop: '12px' }}>
                      <Box 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          backgroundColor: '#f3f4f6', 
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '12px'
                        }}
                      >
                        ⏱️
                      </Box>
                      <Box>
                        <Typography fontSize="14px" fontWeight="500">Under Review</Typography>
                        <Typography fontSize="12px" color="text.hint">
                          {String(activityData.underReview).padStart(2, '0')} Services
                        </Typography>
                      </Box>
                    </FlexBox>

                    <FlexBox alignItems="center" style={{ marginTop: '12px' }}>
                      <Box 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          backgroundColor: '#f3f4f6', 
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '12px'
                        }}
                      >
                        ⏰
                      </Box>
                      <Box>
                        <Typography fontSize="14px" fontWeight="500">Rejected</Typography>
                        <Typography fontSize="12px" color="text.hint">
                          {String(activityData.rejected).padStart(2, '0')} Services
                        </Typography>
                      </Box>
                    </FlexBox>
                  </FlexBox>
                </Box>

                <Box style={{ position: 'relative' }}>
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle
                      cx="70"
                      cy="70"
                      r="55"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="70"
                      cy="70"
                      r="55"
                      fill="none"
                      stroke="#0030E3"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 55 * 0.85} ${2 * Math.PI * 55}`}
                      strokeDashoffset={2 * Math.PI * 55 * 0.25}
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
                    <Typography fontSize="12px" color="text.hint" mb="4px">
                      Service Approval Rate
                    </Typography>
                    <Typography fontSize="32px" fontWeight="bold" color="#0030E3">
                      {activityData.approvalRate}%
                    </Typography>
                  </Box>
                </Box>
              </FlexBox>
            </Card>
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