"use client"

import { Fragment, useState } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Typography, { H5 } from "@component/Typography";
import { Button, TextField, Collapse, IconButton } from "@mui/material";
import { FaRegEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";

// Updated mock data to match Figma design
const firmData = {
  name: "FutureTech LLC",
  businessName: "FutureTech",
  legalStructure: "Limited Liability Company (LLC)",
  registrationNumber: "987654321",
  tin: "AE9876543210",
  industryType: "Technology",
  website: "https://www.futuretech.ae",
  address: "Level 23, Al Fattan Currency House",
  city: "Abu Dhabi",
  postalCode: "123498",
  country: "United Arab Emirates",
  phone: "+971 4 123 4567",
  email: "contact@futuretech.ae",
  joinDate: "2021-04-01",
  stage: "Start-up",
  industry: "Technology",
  location: "Abu Dhabi",
  currency: "AED",
  founded: "2023",
  employees: "5",
  incorporationType: "LLC",
  incorporationStatus: "UAE Based",
  isStartup: "Yes",
  businessType: "Technology Consultancy"
};

export default function FirmProfile() {
  const [legalDetailsExpanded, setLegalDetailsExpanded] = useState(true);
  const [foundingExpanded, setFoundingExpanded] = useState(false);
  const [marketsExpanded, setMarketsExpanded] = useState(false);

  return (
    <Fragment>
      <Box mb="20px">
        <Grid container spacing={4}>
          {/* Left Column - Company Overview */}
          <Grid item xs={12} lg={4}>
            <Card p="24px" height="fit-content">
              <FlexBox alignItems="center" mb="20px">
                <Avatar src="/images/FirmAvatar.png" size={60} />
                <Box ml="16px">
                  <H5 my="0px" fontSize="18px">{firmData.name}</H5>
                  <Typography fontSize="14px" color="text.hint">
                    {firmData.businessType}
                  </Typography>
                </Box>
                <Box ml="auto">
                  <FaRegEdit size={16} color="#888" />
                </Box>
              </FlexBox>

              {/* Company Details */}
              <Box>
                <TableRow p="12px 8px" borderBottom="1px solid #f0f0f0">
                  <Typography fontSize="14px" color="text.hint" width="80%">
                    Stage
                  </Typography>
                  <Typography fontSize="14px" textAlign="right">
                    {firmData.stage}
                  </Typography>
                </TableRow>

                <TableRow p="12px 8px" borderBottom="1px solid #f0f0f0">
                  <Typography fontSize="14px" color="text.hint" width="40%">
                    Industry
                  </Typography>
                  <Typography fontSize="14px" textAlign="right">
                    {firmData.industry}
                  </Typography>
                </TableRow>

                <TableRow p="12px 8px" borderBottom="1px solid #f0f0f0">
                  <Typography fontSize="14px" color="text.hint" width="40%">
                    Location
                  </Typography>
                  <Typography fontSize="14px" textAlign="right">
                    {firmData.location}
                  </Typography>
                </TableRow>

                <TableRow p="12px 8px" borderBottom="1px solid #f0f0f0">
                  <Typography fontSize="14px" color="text.hint" width="40%">
                    Currency
                  </Typography>
                  <Typography fontSize="14px" textAlign="right">
                    {firmData.currency}
                  </Typography>
                </TableRow>

                <TableRow p="12px 8px" borderBottom="1px solid #f0f0f0">
                  <Typography fontSize="14px" color="text.hint" width="40%">
                    Founded
                  </Typography>
                  <Typography fontSize="14px" textAlign="right">
                    {firmData.founded}
                  </Typography>
                </TableRow>

                <TableRow p="12px 8px" borderBottom="1px solid #f0f0f0">
                  <Typography fontSize="14px" color="text.hint" width="40%">
                    Employees
                  </Typography>
                  <Typography fontSize="14px" textAlign="right">
                    {firmData.employees}
                  </Typography>
                </TableRow>

                <TableRow p="12px 8px" borderBottom="1px solid #f0f0f0">
                  <Typography fontSize="14px" color="text.hint" width="40%">
                    Incorporation Type
                  </Typography>
                  <Typography fontSize="14px" textAlign="right">
                    {firmData.incorporationType}
                  </Typography>
                </TableRow>

                <TableRow p="12px 8px">
                  <Typography fontSize="14px" color="text.hint" width="40%">
                    Website
                  </Typography>
                  <Typography fontSize="14px" textAlign="right">
                    N/A
                  </Typography>
                </TableRow>
              </Box>
            </Card>
          </Grid>

          {/* Right Column - Detailed Sections */}
          <Grid item xs={12} lg={8}>
            {/* Tabs Navigation */}
            <FlexBox mb="24px" borderBottom="2px solid #f0f0f0">
              <Box 
                p="12px 16px" 
                borderBottom="2px solid #0066FF" 
                style={{ cursor: 'pointer' }}
              >
                <Typography fontSize="14px" fontWeight="600" color="#0066FF">
                  Business Details
                </Typography>
              </Box>
              <Box p="12px 16px" style={{ cursor: 'pointer' }}>
                <Typography fontSize="14px" color="text.hint">
                  Overview
                </Typography>
              </Box>
              <Box p="12px 16px" style={{ cursor: 'pointer' }}>
                <Typography fontSize="14px" color="text.hint">
                  Financials
                </Typography>
              </Box>
            </FlexBox>

            {/* Legal & Contact Details Section */}
            <Card p="24px" mb="16px">
              <FlexBox 
                justifyContent="space-between" 
                alignItems="center" 
                mb="20px"
                style={{ cursor: 'pointer' }}
                onClick={() => setLegalDetailsExpanded(!legalDetailsExpanded)}
              >
                <FlexBox alignItems="center">
                  <IconButton size="small" style={{ marginRight: '8px' }}>
                    {legalDetailsExpanded ? <FaChevronDown /> : <FaChevronUp />}
                  </IconButton>
                  <Typography fontSize="16px" fontWeight="600">
                    Legal & Contact Details
                  </Typography>
                </FlexBox>
                <FaRegEdit size={16} color="#888" />
              </FlexBox>
              
              <Collapse in={legalDetailsExpanded}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        Business Name
                      </Typography>
                      <Typography fontSize="14px" p="10px 0">
                        {firmData.businessName}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        Phone
                      </Typography>
                      <Typography fontSize="14px" p="10px 0">
                        {firmData.phone}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        Email
                      </Typography>
                      <Typography fontSize="14px" p="10px 0">
                        {firmData.email}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        Legal Structure
                      </Typography>
                      <Typography fontSize="14px" p="10px 0">
                        {firmData.legalStructure}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        Website URL
                      </Typography>
                      <Typography 
                        fontSize="14px" 
                        p="10px 0" 
                        color="#0066FF" 
                        style={{ textDecoration: 'underline', cursor: 'pointer' }}
                      >
                        {firmData.website}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        Registered Address
                      </Typography>
                      <Typography fontSize="14px" p="10px 0">
                        {firmData.address}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        Country of Registration
                      </Typography>
                      <Typography fontSize="14px" p="10px 0">
                        {firmData.country}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        Postal Code
                      </Typography>
                      <Typography fontSize="14px" p="10px 0">
                        {firmData.postalCode}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        City
                      </Typography>
                      <Typography fontSize="14px" p="10px 0">
                        {firmData.city}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        Business Type
                      </Typography>
                      <Typography fontSize="14px" p="10px 0">
                        {firmData.businessType}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        Incorporation Status
                      </Typography>
                      <Typography fontSize="14px" p="10px 0">
                        {firmData.incorporationStatus}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box mb="16px">
                      <Typography color="text.muted" mb="6px" fontSize="13px">
                        Is this a Start-Up?
                      </Typography>
                      <Typography fontSize="14px" p="10px 0">
                        {firmData.isStartup}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Collapse>
            </Card>

            {/* Founding and Ownership Section */}
            <Card p="24px" mb="16px">
              <FlexBox 
                justifyContent="space-between" 
                alignItems="center" 
                mb="20px"
                style={{ cursor: 'pointer' }}
                onClick={() => setFoundingExpanded(!foundingExpanded)}
              >
                <FlexBox alignItems="center">
                  <IconButton size="small" style={{ marginRight: '8px' }}>
                    {foundingExpanded ? <FaChevronDown /> : <FaChevronUp />}
                  </IconButton>
                  <Typography fontSize="16px" fontWeight="600">
                    Founding and ownership
                  </Typography>
                </FlexBox>
              </FlexBox>
              
              <Collapse in={foundingExpanded}>
                <Typography color="text.muted" fontSize="14px">
                  Founding and ownership details would go here...
                </Typography>
              </Collapse>
            </Card>

            {/* Markets and Offerings Section */}
            <Card p="24px">
              <FlexBox 
                justifyContent="space-between" 
                alignItems="center" 
                mb="20px"
                style={{ cursor: 'pointer' }}
                onClick={() => setMarketsExpanded(!marketsExpanded)}
              >
                <FlexBox alignItems="center">
                  <IconButton size="small" style={{ marginRight: '8px' }}>
                    {marketsExpanded ? <FaChevronDown /> : <FaChevronUp />}
                  </IconButton>
                  <Typography fontSize="16px" fontWeight="600">
                    Markets and offerings
                  </Typography>
                </FlexBox>
              </FlexBox>
              
              <Collapse in={marketsExpanded}>
                <Typography color="text.muted" fontSize="14px">
                  Markets and offerings details would go here...
                </Typography>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}