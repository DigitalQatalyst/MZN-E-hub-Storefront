"use client"

import { Fragment } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Typography, { H5 } from "@component/Typography";
import { Button } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";



// Mock user data to match the structure of your API response
const firmData = {
    name: "FutureTech LLC",
    legalStructure: "LLC (Limited Liability Company)",
    registrationNumber: "987654321",
    tin: "AE9876543210",
    industryType: "Technology",
    website: "www.futuretechllc.com",
    address: "St Al Waleeh, Abu Dhabi",
    joinDate: "2021-04-01",
    
};

export default function FirmProfile() {
  return (
    <Fragment>
      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <FlexBox 
              as={Card} 
              p="14px 32px" 
              height="100%" 
              borderRadius={8} 
              alignItems="center" 
              width="100%"
            >
              <Avatar src="/images/FirmAvatar.png" size={64} />
              <Box ml="12px" flex="1 1 0">
                <FlexBox 
                  flexWrap="wrap" 
                  justifyContent="space-between" 
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px">{firmData.name}</H5>
                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.hint" mr="16px">
                        {firmData.address}
                      </Typography>
                      <Typography fontSize="14px" color="text.hint">
                        Joined {new Date(firmData.joinDate).toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </Typography>
                    </FlexBox>
                  </div>
                  <Button
                    variant="contained"
                    size="small"
                    background-color="#0030E3"
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  >
                    Change firm logo
                  </Button>
                </FlexBox>
              </Box>
            </FlexBox>
          </Grid>
        </Grid>
      </Box>

      <Card p="1.5rem">
        <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
          <Typography variant="h3">Basic Information</Typography>
          <FaRegEdit size={20} color="#888" />
        </FlexBox>
        
        <TableRow p="0.75rem 0">
          <FlexBox flexDirection="column" width="50%" p="0.5rem">
            <Typography color="text.muted" mb="4px">Firm Name</Typography>
            <span>{firmData.name}</span>
          </FlexBox>
          <FlexBox flexDirection="column" width="50%" p="0.5rem">
            <Typography color="text.muted" mb="4px">Legal Structure</Typography>
            <span>{firmData.legalStructure}</span>
          </FlexBox>
        </TableRow>

        <TableRow p="0.75rem 0">
          <FlexBox flexDirection="column" width="50%" p="0.5rem">
            <Typography color="text.muted" mb="4px">Firm Registration Number</Typography>
            <span>{firmData.registrationNumber}</span>
          </FlexBox>
          <FlexBox flexDirection="column" width="50%" p="0.5rem">
            <Typography color="text.muted" mb="4px">Tax Identification Number (TIN)</Typography>
            <span>{firmData.tin}</span>
          </FlexBox>
        </TableRow>

        <TableRow p="0.75rem 0">
          <FlexBox flexDirection="column" width="50%" p="0.5rem">
            <Typography color="text.muted" mb="4px">Industry Type</Typography>
            <span>{firmData.industryType}</span>
          </FlexBox>
          <FlexBox flexDirection="column" width="50%" p="0.5rem">
            <Typography color="text.muted" mb="4px">Firm Website</Typography>
            <span>{firmData.website}</span>
          </FlexBox>
        </TableRow>
      </Card>
    </Fragment>
  );
}