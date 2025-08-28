"use client";

import { Fragment, useState, useEffect } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Typography, { H5 } from "@component/Typography";
import { Divider } from "@mui/material";
import { FaRegEdit } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";

// Mock data
const firmData = {
  name: "FutureTech LLC",
  businessType: "Technology Consultancy",
  stage: "Start-up",
  industry: "Technology",
  location: "Abu Dhabi",
  currency: "AED",
  founded: "2023",
  employees: "5",
  incorporationType: "LLC",
  website: "https://www.futuretech.ae",
  email: "contact@futuretech.ae",
  phone: "+971 4 123 4567",
  legalStructure: "Limited Liability Company (LLC)",
  countryOfRegistration: "United Arab Emirates",
  registeredAddress: "Level 23, Al Fattan Currency House",
  postalCode: "123498",
  incorporationStatus: "UAE Based",
  isStartup: "Yes",
};

// Dummy data for Business Identity dropdowns
const generalProfileData = {
  businessDescription: "FutureTech LLC is a cutting-edge technology consultancy specializing in digital transformation and AI solutions for enterprises.",
  missionStatement: "To empower businesses through innovative technology solutions that drive growth and efficiency.",
  visionStatement: "To be the leading technology partner for businesses in the MENA region.",
  coreValues: ["Innovation", "Integrity", "Excellence", "Client-Centricity"],
  keyDifferentiators: ["AI Expertise", "Rapid Implementation", "24/7 Support", "Custom Solutions"]
};

const businessRegistrationData = {
  registrationNumber: "LLC-2023-AUH-45789",
  registrationDate: "March 15, 2023",
  registrationAuthority: "Abu Dhabi Department of Economic Development",
  tradeLicenseNumber: "CN-1234567",
  tradeLicenseExpiry: "March 14, 2026",
  commercialName: "FutureTech LLC",
  legalName: "Future Technology Solutions Limited Liability Company"
};

const classificationData = {
  businessStage: "Start-up (Seed Stage)",
  companySize: "Micro Enterprise (1-10 employees)",
  industryClassification: "Information and Communication Technology",
  subIndustry: "Computer Programming and Consultancy",
  businessModel: "B2B Service Provider",
  revenueModel: "Consulting Fees + Project-based"
};

const referralSourceData = {
  referredBy: "Abu Dhabi Entrepreneurs Network",
  referralDate: "January 20, 2024",
  referralType: "Business Network",
  referralContact: "Ahmed Al-Mansouri",
  referralContactEmail: "ahmed@abudhabi-entrepreneurs.ae",
  referralReason: "Technology expertise recommendation"
};

// Dummy data for Business Operations dropdowns
const founderTeamData = {
  founders: [
    {
      name: "Sarah Johnson",
      position: "CEO & Co-Founder",
      experience: "10 years in Technology Consulting",
      education: "MBA from INSEAD, BS Computer Science from MIT",
      previousCompanies: ["McKinsey & Company", "Google"]
    },
    {
      name: "Ahmed Al-Rashid",
      position: "CTO & Co-Founder",
      experience: "12 years in Software Development",
      education: "MS Computer Science from Stanford, BS from AUS",
      previousCompanies: ["Microsoft", "Amazon Web Services"]
    }
  ],
  keyEmployees: [
    {
      name: "Maria Rodriguez",
      position: "Lead Data Scientist",
      experience: "8 years in AI/ML",
      education: "PhD in Machine Learning from Cambridge"
    },
    {
      name: "Omar Hassan",
      position: "Senior Software Engineer",
      experience: "6 years in Full-stack Development",
      education: "BS Computer Engineering from AUB"
    }
  ]
};

const businessReachData = {
  primaryMarkets: ["UAE", "Saudi Arabia", "Qatar", "Oman"],
  targetCustomers: ["Large Enterprises", "Government Entities", "SMEs in Tech Sector"],
  geographicReach: "GCC Region with expansion plans to wider MENA",
  clientAcquisitionChannels: ["Direct Sales", "Partner Networks", "Digital Marketing", "Referrals"],
  marketingStrategy: "Account-based marketing focused on enterprise clients"
};

const topClientsData = {
  clients: [
    { name: "ADNOC Digital", industry: "Oil & Gas", projectValue: "AED 2.5M", duration: "18 months" },
    { name: "Emirates NBD", industry: "Banking", projectValue: "AED 1.8M", duration: "12 months" },
    { name: "Dubai Municipality", industry: "Government", projectValue: "AED 3.2M", duration: "24 months" },
    { name: "Etisalat Group", industry: "Telecommunications", projectValue: "AED 1.5M", duration: "15 months" }
  ],
  clientRetentionRate: "95%",
  averageProjectValue: "AED 2.25M",
  totalActiveClients: "12"
};

const competitorsData = {
  directCompetitors: [
    { name: "TechMENA Solutions", strengths: ["Market presence", "Government contracts"], weaknesses: ["Limited AI expertise"] },
    { name: "Digital Gulf Consulting", strengths: ["Large team", "Multiple offices"], weaknesses: ["Higher costs", "Slower delivery"] },
    { name: "Innovation Partners DMCC", strengths: ["Dubai focus", "Startup ecosystem"], weaknesses: ["Limited enterprise experience"] }
  ],
  competitiveAdvantages: ["AI Specialization", "Faster Time-to-Market", "Cost-Effective Solutions", "Local Market Knowledge"],
  marketPosition: "Niche leader in AI-driven business transformation"
};

// Add CSS for custom scrollbar - this will be added via useEffect
const scrollbarCSS = `
  .custom-tab-scroll::-webkit-scrollbar {
    height: 4px;
  }
  .custom-tab-scroll::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
  }
  .custom-tab-scroll::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  .custom-tab-scroll::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .custom-tab-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  }
`;

export default function FirmProfile() {
  const [activeTab, setActiveTab] = useState("Business Identity");
  const [expandedSections, setExpandedSections] = useState({});

  // Add the scrollbar styles on component mount
  useEffect(() => {
    // Check if the style tag already exists
    if (!document.getElementById('firm-profile-scrollbar-styles')) {
      const styleSheet = document.createElement("style");
      styleSheet.id = 'firm-profile-scrollbar-styles';
      styleSheet.textContent = scrollbarCSS;
      document.head.appendChild(styleSheet);
    }
    
    // Cleanup function
    return () => {
      const existingStyle = document.getElementById('firm-profile-scrollbar-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  const tabs = [
    "Business Identity",
    "Business Operations",
    "Offering & Capabilities",
    "Financial & Compliance",
    "Strategy & Growth",
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const businessIdentityItems = [
    { 
      id: 1, 
      title: "General Profile",
      content: (
        <Box>
          <Typography fontSize="14px" fontWeight="600" mb="8px">Business Description</Typography>
          <Typography fontSize="14px" color="text.hint" mb="16px">{generalProfileData.businessDescription}</Typography>
          
          <Typography fontSize="14px" fontWeight="600" mb="8px">Mission Statement</Typography>
          <Typography fontSize="14px" color="text.hint" mb="16px">{generalProfileData.missionStatement}</Typography>
          
          <Typography fontSize="14px" fontWeight="600" mb="8px">Vision Statement</Typography>
          <Typography fontSize="14px" color="text.hint" mb="16px">{generalProfileData.visionStatement}</Typography>
          
          <Typography fontSize="14px" fontWeight="600" mb="8px">Core Values</Typography>
          <FlexBox flexWrap="wrap" mb="16px">
            {generalProfileData.coreValues.map((value, idx) => (
              <Box key={idx} px="12px" py="4px" bg="#E3F2FD" borderRadius="16px" mr="8px" mb="8px">
                <Typography fontSize="12px" color="#1976D2">{value}</Typography>
              </Box>
            ))}
          </FlexBox>
          
          <Typography fontSize="14px" fontWeight="600" mb="8px">Key Differentiators</Typography>
          <FlexBox flexWrap="wrap">
            {generalProfileData.keyDifferentiators.map((diff, idx) => (
              <Box key={idx} px="12px" py="4px" bg="#E8F5E8" borderRadius="16px" mr="8px" mb="8px">
                <Typography fontSize="12px" color="#2E7D32">{diff}</Typography>
              </Box>
            ))}
          </FlexBox>
        </Box>
      )
    },
    { 
      id: 2, 
      title: "Business Registration",
      content: (
        <Box>
          {Object.entries(businessRegistrationData).map(([key, value], idx) => (
            <Box
              key={idx}
              py="10px"
              borderBottom={idx < Object.entries(businessRegistrationData).length - 1 ? "1px solid #f0f0f0" : "none"}
              display="flex"
              justifyContent="space-between"
            >
              <Typography fontSize="14px" color="text.hint">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Typography>
              <Typography fontSize="14px">{value}</Typography>
            </Box>
          ))}
        </Box>
      )
    },
    { 
      id: 3, 
      title: "Classification & Stage",
      content: (
        <Box>
          {Object.entries(classificationData).map(([key, value], idx) => (
            <Box
              key={idx}
              py="10px"
              borderBottom={idx < Object.entries(classificationData).length - 1 ? "1px solid #f0f0f0" : "none"}
              display="flex"
              justifyContent="space-between"
            >
              <Typography fontSize="14px" color="text.hint">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Typography>
              <Typography fontSize="14px">{value}</Typography>
            </Box>
          ))}
        </Box>
      )
    },
    { 
      id: 4, 
      title: "Referral Source",
      content: (
        <Box>
          {Object.entries(referralSourceData).map(([key, value], idx) => (
            <Box
              key={idx}
              py="10px"
              borderBottom={idx < Object.entries(referralSourceData).length - 1 ? "1px solid #f0f0f0" : "none"}
              display="flex"
              justifyContent="space-between"
            >
              <Typography fontSize="14px" color="text.hint">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Typography>
              <Typography fontSize="14px">{value}</Typography>
            </Box>
          ))}
        </Box>
      )
    },
  ];

  const businessOperationsItems = [
    {
      id: 5,
      title: "Contact Details",
      content: (
        <Box>
          {[
            { label: "Business Name", value: firmData.name },
            { label: "Email", value: firmData.email },
            { label: "Phone", value: firmData.phone },
            { label: "Website URL", value: firmData.website },
            { label: "Country of Registration", value: firmData.countryOfRegistration },
            { label: "Legal Structure", value: firmData.legalStructure },
            { label: "Registered Address", value: firmData.registeredAddress },
            { label: "City", value: firmData.location },
            { label: "Postal Code", value: firmData.postalCode },
            { label: "Incorporation Status", value: firmData.incorporationStatus },
            { label: "Is this a Start-Up?", value: firmData.isStartup },
          ].map((item, idx) => (
            <Box
              key={idx}
              py="10px"
              borderBottom={idx < 10 ? "1px solid #f0f0f0" : "none"}
              display="flex"
              justifyContent="space-between"
            >
              <Typography fontSize="14px" color="text.hint">
                {item.label}
              </Typography>
              <Typography fontSize="14px">{item.value}</Typography>
            </Box>
          ))}
        </Box>
      )
    },
    {
      id: 6,
      title: "Founder & Team",
      content: (
        <Box>
          <Typography fontSize="14px" fontWeight="600" mb="12px">Founders</Typography>
          {founderTeamData.founders.map((founder, idx) => (
            <Box key={idx} mb="16px" p="12px" bg="#f8f9fa" borderRadius="8px">
              <FlexBox justifyContent="space-between" alignItems="center" mb="8px">
                <Typography fontSize="14px" fontWeight="600">{founder.name}</Typography>
                <Box px="8px" py="2px" bg="#0030E3" borderRadius="12px">
                  <Typography fontSize="12px" color="#fff">{founder.position}</Typography>
                </Box>
              </FlexBox>
              <Typography fontSize="12px" color="text.hint" mb="4px">Experience: {founder.experience}</Typography>
              <Typography fontSize="12px" color="text.hint" mb="4px">Education: {founder.education}</Typography>
              <Typography fontSize="12px" color="text.hint">Previous: {founder.previousCompanies.join(", ")}</Typography>
            </Box>
          ))}
          
          <Typography fontSize="14px" fontWeight="600" mb="12px" mt="20px">Key Team Members</Typography>
          {founderTeamData.keyEmployees.map((employee, idx) => (
            <Box key={idx} mb="16px" p="12px" bg="#f8f9fa" borderRadius="8px">
              <FlexBox justifyContent="space-between" alignItems="center" mb="8px">
                <Typography fontSize="14px" fontWeight="600">{employee.name}</Typography>
                <Box px="8px" py="2px" bg="#28a745" borderRadius="12px">
                  <Typography fontSize="12px" color="#fff">{employee.position}</Typography>
                </Box>
              </FlexBox>
              <Typography fontSize="12px" color="text.hint" mb="4px">Experience: {employee.experience}</Typography>
              <Typography fontSize="12px" color="text.hint">Education: {employee.education}</Typography>
            </Box>
          ))}
        </Box>
      )
    },
    {
      id: 7,
      title: "Business Reach",
      content: (
        <Box>
          <Typography fontSize="14px" fontWeight="600" mb="8px">Primary Markets</Typography>
          <FlexBox flexWrap="wrap" mb="16px">
            {businessReachData.primaryMarkets.map((market, idx) => (
              <Box key={idx} px="12px" py="4px" bg="#E3F2FD" borderRadius="16px" mr="8px" mb="8px">
                <Typography fontSize="12px" color="#1976D2">{market}</Typography>
              </Box>
            ))}
          </FlexBox>
          
          <Typography fontSize="14px" fontWeight="600" mb="8px">Target Customers</Typography>
          <FlexBox flexWrap="wrap" mb="16px">
            {businessReachData.targetCustomers.map((customer, idx) => (
              <Box key={idx} px="12px" py="4px" bg="#F3E5F5" borderRadius="16px" mr="8px" mb="8px">
                <Typography fontSize="12px" color="#7B1FA2">{customer}</Typography>
              </Box>
            ))}
          </FlexBox>
          
          <Box py="10px" borderBottom="1px solid #f0f0f0" display="flex" justifyContent="space-between" mb="10px">
            <Typography fontSize="14px" color="text.hint">Geographic Reach</Typography>
            <Typography fontSize="14px">{businessReachData.geographicReach}</Typography>
          </Box>
          
          <Box py="10px" borderBottom="1px solid #f0f0f0" display="flex" justifyContent="space-between" mb="16px">
            <Typography fontSize="14px" color="text.hint">Marketing Strategy</Typography>
            <Typography fontSize="14px">{businessReachData.marketingStrategy}</Typography>
          </Box>
          
          <Typography fontSize="14px" fontWeight="600" mb="8px">Client Acquisition Channels</Typography>
          <FlexBox flexWrap="wrap">
            {businessReachData.clientAcquisitionChannels.map((channel, idx) => (
              <Box key={idx} px="12px" py="4px" bg="#FFF3E0" borderRadius="16px" mr="8px" mb="8px">
                <Typography fontSize="12px" color="#F57C00">{channel}</Typography>
              </Box>
            ))}
          </FlexBox>
        </Box>
      )
    },
    {
      id: 8,
      title: "Top Clients",
      content: (
        <Box>
          <FlexBox mb="20px" flexWrap="wrap">
            <Box p="16px" bg="#E3F2FD" borderRadius="8px" textAlign="center" minWidth="120px" mr="16px" mb="16px">
              <Typography fontSize="20px" fontWeight="700" color="#1976D2">{topClientsData.clientRetentionRate}</Typography>
              <Typography fontSize="12px" color="#1976D2">Retention Rate</Typography>
            </Box>
            <Box p="16px" bg="#E8F5E8" borderRadius="8px" textAlign="center" minWidth="120px" mr="16px" mb="16px">
              <Typography fontSize="20px" fontWeight="700" color="#2E7D32">{topClientsData.averageProjectValue}</Typography>
              <Typography fontSize="12px" color="#2E7D32">Avg Project Value</Typography>
            </Box>
            <Box p="16px" bg="#F3E5F5" borderRadius="8px" textAlign="center" minWidth="120px" mr="16px" mb="16px">
              <Typography fontSize="20px" fontWeight="700" color="#7B1FA2">{topClientsData.totalActiveClients}</Typography>
              <Typography fontSize="12px" color="#7B1FA2">Active Clients</Typography>
            </Box>
          </FlexBox>
          
          <Typography fontSize="14px" fontWeight="600" mb="12px">Major Clients</Typography>
          {topClientsData.clients.map((client, idx) => (
            <Box key={idx} mb="12px" p="12px" border="1px solid #e0e0e0" borderRadius="8px">
              <FlexBox justifyContent="space-between" alignItems="center" mb="8px">
                <Typography fontSize="14px" fontWeight="600">{client.name}</Typography>
                <Box px="8px" py="2px" bg="#f5f5f5" borderRadius="12px">
                  <Typography fontSize="12px" color="#666">{client.industry}</Typography>
                </Box>
              </FlexBox>
              <FlexBox justifyContent="space-between">
                <Typography fontSize="12px" color="text.hint">Value: <span style={{color: "#2E7D32", fontWeight: "600"}}>{client.projectValue}</span></Typography>
                <Typography fontSize="12px" color="text.hint">Duration: {client.duration}</Typography>
              </FlexBox>
            </Box>
          ))}
        </Box>
      )
    },
    {
      id: 9,
      title: "Competitors",
      content: (
        <Box>
          <Typography fontSize="14px" fontWeight="600" mb="12px">Direct Competitors</Typography>
          {competitorsData.directCompetitors.map((competitor, idx) => (
            <Box key={idx} mb="16px" p="12px" border="1px solid #e0e0e0" borderRadius="8px">
              <Typography fontSize="14px" fontWeight="600" mb="12px">{competitor.name}</Typography>
              <FlexBox>
                <Box flex="1" mr="20px">
                  <Typography fontSize="12px" fontWeight="600" color="#2E7D32" mb="6px">STRENGTHS</Typography>
                  {competitor.strengths.map((strength, i) => (
                    <Typography key={i} fontSize="12px" color="text.hint" mb="2px">• {strength}</Typography>
                  ))}
                </Box>
                <Box flex="1">
                  <Typography fontSize="12px" fontWeight="600" color="#d32f2f" mb="6px">WEAKNESSES</Typography>
                  {competitor.weaknesses.map((weakness, i) => (
                    <Typography key={i} fontSize="12px" color="text.hint" mb="2px">• {weakness}</Typography>
                  ))}
                </Box>
              </FlexBox>
            </Box>
          ))}
          
          <Typography fontSize="14px" fontWeight="600" mb="8px" mt="20px">Our Competitive Advantages</Typography>
          <FlexBox flexWrap="wrap" mb="16px">
            {competitorsData.competitiveAdvantages.map((advantage, idx) => (
              <Box key={idx} px="12px" py="4px" bg="#E3F2FD" borderRadius="16px" mr="8px" mb="8px">
                <Typography fontSize="12px" color="#1976D2">{advantage}</Typography>
              </Box>
            ))}
          </FlexBox>
          
          <Box p="12px" bg="#E3F2FD" borderRadius="8px">
            <Typography fontSize="12px" fontWeight="600" color="#1976D2">Market Position</Typography>
            <Typography fontSize="12px" color="#1976D2">{competitorsData.marketPosition}</Typography>
          </Box>
        </Box>
      )
    }
  ];

  const renderDropdownSection = (item) => {
    const isExpanded = expandedSections[item.id];
    
    return (
      <Card key={item.id} p="20px" mb="12px">
        <FlexBox 
          justifyContent="space-between" 
          alignItems="center" 
          style={{ cursor: "pointer" }}
          onClick={() => toggleSection(item.id)}
        >
          <Typography fontSize="16px" fontWeight="500">
            {item.title}
          </Typography>
          {isExpanded ? (
            <ChevronUp size={20} color="#888" />
          ) : (
            <ChevronDown size={20} color="#888" />
          )}
        </FlexBox>
        
        {isExpanded && (
          <>
            <Divider sx={{ my: 2 }} />
            {item.content}
          </>
        )}
      </Card>
    );
  };

  return (
    <Fragment>
      {/* Changed from Box with margin to Box with padding to prevent overflow */}
      <Box px={4} py={4} style={{ overflowX: 'hidden', width: '100%' }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} lg={4}>
            <Card p="20px" height="fit-content">
              <FlexBox justifyContent="space-between" alignItems="center" mb="20px">
                <Typography fontSize="16px" fontWeight="600">
                  Business Profile
                </Typography>
                <FaRegEdit size={16} color="#888" style={{ cursor: "pointer" }} />
              </FlexBox>

              {/* Logo */}
              <Box
                width="48px"
                height="48px"
                bg="#0030E3"
                borderRadius="6px"
                mb="12px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography fontSize="20px" fontWeight="700" color="#fff">
                  ft
                </Typography>
              </Box>

              {/* Name & Type */}
              <H5 my="0px" fontSize="18px">
                {firmData.name}
              </H5>
              <Typography fontSize="14px" color="text.hint" mb="16px">
                {firmData.businessType}
              </Typography>

              {/* Info List */}
              {[
                { label: "Stage", value: firmData.stage },
                { label: "Industry", value: firmData.industry },
                { label: "Location", value: firmData.location },
                { label: "Currency", value: firmData.currency },
                { label: "Founded", value: firmData.founded },
                { label: "Employees", value: firmData.employees },
                { label: "Incorporation Type", value: firmData.incorporationType },
                { label: "Website", value: firmData.website },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  py="10px"
                  borderBottom={idx < 7 ? "1px solid #f0f0f0" : "none"}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography fontSize="14px" color="text.hint">
                    {item.label}
                  </Typography>
                  <Typography fontSize="14px" style={{ wordBreak: 'break-word' }}>{item.value}</Typography>
                </Box>
              ))}
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} lg={8}>
            {/* Tabs with improved scroll styling */}
            <Box 
              mb="24px" 
              borderBottom="1px solid #E0E0E0"
              className="custom-tab-scroll"
              style={{
                overflowX: "auto",
                overflowY: "hidden",
                paddingBottom: "2px",
              }}
            >
              <FlexBox style={{ minWidth: "fit-content" }}>
                {tabs.map((tab) => (
                  <Box
                    key={tab}
                    p="12px 24px"
                    borderBottom={`2px solid ${
                      activeTab === tab ? "#0030E3" : "transparent"
                    }`}
                    style={{ 
                      cursor: "pointer", 
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      transition: "all 0.3s ease"
                    }}
                    onClick={() => setActiveTab(tab)}
                  >
                    <Typography
                      fontSize="14px"
                      fontWeight="500"
                      color={activeTab === tab ? "#242424" : "text.hint"}
                    >
                      {tab}
                    </Typography>
                  </Box>
                ))}
              </FlexBox>
            </Box>

            {/* Tab Content */}
            {activeTab === "Business Identity" && (
              <>
                {businessIdentityItems.map(renderDropdownSection)}
              </>
            )}

            {activeTab === "Business Operations" && (
              <>
                {businessOperationsItems.map(renderDropdownSection)}
              </>
            )}

            {activeTab === "Offering & Capabilities" && (
              <>
                {[
                  { id: 10, title: "General Profile" },
                  { id: 11, title: "Business Registration" },
                  { id: 12, title: "Classification & Stage" },
                  { id: 13, title: "Referral Source" },
                ].map((item) => (
                  <Card key={item.id} p="20px" mb="12px">
                    <Typography fontSize="16px" fontWeight="500">
                      {item.title}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography fontSize="14px" color="text.hint">
                      Content for {item.title} will go here...
                    </Typography>
                  </Card>
                ))}
              </>
            )}

            {activeTab !== "Business Identity" &&
              activeTab !== "Business Operations" &&
              activeTab !== "Offering & Capabilities" && (
                <Card p="20px">
                  <Typography fontSize="14px" color="text.hint">
                    Content coming soon...
                  </Typography>
                </Card>
              )}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}