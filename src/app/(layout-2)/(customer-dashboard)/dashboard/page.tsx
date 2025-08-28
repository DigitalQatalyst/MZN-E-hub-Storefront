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
import QuickAccessCard from "./QuickAccessCard";

export default function Dashboard() {
  // const user = await api.getUser();

  const handleDraftClick = () => {
    // Navigate to drafts page or handle draft action
    console.log("Navigate to drafts");
  };

  const handleReviewClick = () => {
    // Navigate to review page or handle review action
    console.log("Navigate to review");
  };

  return (
    <Fragment>
      <Box style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', marginLeft: '10px' }}>
        <Grid container spacing={3}>
          {/* Top Row - Profile Completion Card */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ProfileCompletionCard completionPercentage={50} />
          </Grid>

          {/* Top Row - Quick Access Card */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <QuickAccessCard
              draftCount={3}
              reviewCount={4}
              onDraftClick={handleDraftClick}
              onReviewClick={handleReviewClick}
            />
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