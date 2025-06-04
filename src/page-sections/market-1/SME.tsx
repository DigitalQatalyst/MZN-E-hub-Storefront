"use client";

import { useState } from "react";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import NextImage from "@component/NextImage";
import { ProductCard1 } from "@component/product-cards";
import CategorySectionHeader from "@component/CategorySectionHeader";
import StyledProductCategory from "./styled";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";
import ArrowBackIos from "/public/assets/images/community Marketplace Details/arrow_back_ios.svg";


type Props = { carList: Product[]; carBrands: Brand[] };


export default function Section6({ carList, carBrands }: Props) {
  const [selected, setSelected] = useState("discussions"); // State for tabs: "discussions", "about", "events"
  const [selectedGroup, setSelectedGroup] = useState(""); // State for selected group in the sidebar
  const [expandedSection, setExpandedSection] = useState('Quality Content'); 

  const toggleGuidelinesSection = (sectionName) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };
  // Dummy data for discussions and groups (to be replaced with actual data fetching)
  const discussions = [
    {
      id: "1",
      author: "Black Rock",
      time: "34 mins",
      content: "These experiences are shaping how we approach Scope 3 emissions and build partnerships across markets. Let's continue the conversation on how small actions can lead to scalable climate impact...Read more",
    },
  ];

  const groups = [
    { id: "esg-compliance", name: "ESG Compliance Help" },
    { id: "carbon-credit", name: "Carbon Credit Conversations" },
    { id: "local-supply-chains", name: "Local Supply Chains" },
    { id: "funding-grants", name: "Funding & Grants" },
    { id: "esg-policy-exchange", name: "ESG Policy Exchange" },
    { id: "green-energy-solutions", name: "Green Energy Solutions" },
  ];
  const guidelines = [
    { title: 'Respectful Communication', content: [] },
    { title: 'Quality Content', content: [
      'Share accurate information from accurate sources',
      'Share accurate information from accurate sources',
      'Respect intellectual property and cite sources appropriately',
      'Keep content relevant to the community’s focus area'
    ]},
    { title: 'Privacy & Confidentiality', content: [] },
    { title: 'Intellectual Property', content: [] },
    { title: 'Commercial Activity', content: [] }
  ];

  const events = [
  {
    id: "e1",
    imageSrc: "/assets/images/community Marketplace Details/Blog Image (3).svg",
    type: "",
    title: "Carbon Accounting Workshop",
    date: "24 June 2025",
    time: "04:30 PM - 06:30 PM",
    location: "Abu Dhabi SME Hub, Khalifa Fund HQ, Abu Dhabi",
  },
  {
    id: "e2",
    imageSrc: "/assets/images/community Marketplace Details/Blog Image (2).svg",
    type: "Webinar",
    title: "Sustainability in Action",
    date: "03 Jun 2025",
    time: "02:00 PM - 03:30 PM",
    location: "Virtual",
  },
  {
    id: "e3",
    imageSrc: "assets/images/community Marketplace Details/Blog Image.svg",
    type: "",
    title: "SME Sustainability Roundtable",
    date: "28 Aug 2025",
    time: "04:30 PM - 06:30 PM",
    location: "Abu Dhabi SME Hub, Khalifa Fund HQ, Abu Dhabi",
  },
];

  const handleCategoryClick = (brand: Brand) => () => {
    if (selected === brand.slug) setSelected("");
    else setSelected(brand.slug);
  };

  return (
    <Container mb="80px">
      <FlexBox>
        {/* Sidebar */}
        <Hidden down={768} mr="1.75rem">
          <Box shadow={6} borderRadius={10} padding="1.25rem" bg="white" minWidth="280px">
            {/* Explore Section */}
            <StyledProductCategory>
              <Box display="flex" flexDirection="column" alignItems="flex-start" marginBottom={3}>
                <span style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#000000' }}>
                  Explore
                </span>
                <Box display="flex" alignItems="center" marginTop={1} padding="8px" borderRadius="8px" width="100%" maxWidth="280px">
                  <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
                    <NextImage width={24} height={24} alt="explore-icon" src="/images/Avatar (2).png" />
                  </Box>
                  <span style={{ fontSize: '12px', color: '#212121', fontWeight: 600 }}>Communities</span>
                </Box>
              </Box>
            </StyledProductCategory>

            {/* Favourites Section */}
            <StyledProductCategory>
              <Box display="flex" flexDirection="column" alignItems="flex-start" marginBottom={4}>
                <span style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#000' }}>
                  Favourites
                </span>
                <Box display="flex" alignItems="center" marginTop={1} padding="12px" borderRadius="8px" width="100%" maxWidth="280px">
                  <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
                    <NextImage width={24} height={24} alt="favourites-icon" src="/images/Avatar (3).png" />
                  </Box>
                  <span style={{ fontSize: '12px', color: '#6C757D', fontWeight: 400 }}>Keep your favorites at your fingertips. Favorites will appear here.</span>
                </Box>
              </Box>
            </StyledProductCategory>

            {/* Communities Section */}
            <StyledProductCategory>
              <Box display="flex" flexDirection="column" alignItems="flex-start" marginBottom={4}>
                <span style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#000' }}>
                  Communities
                </span>
                <Box display="flex" alignItems="center" marginTop={1} padding="12px" borderRadius="8px" width="100%" maxWidth="280px">
                  <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
                    <NextImage width={24} height={24} alt="communities-icon" src="/images/Avatar (2).png" />
                  </Box>
                  <span style={{ fontSize: '12px', color: '#6C757D', fontWeight: 400 }}>No communities yet</span>
                </Box>
              </Box>
            </StyledProductCategory>

            {/* Discover Communities Link */}
            <StyledProductCategory mt="2rem" p="0">
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#0061F2', textDecoration: 'underline', cursor: 'pointer' }}>
                Discover communities
              </span>
            </StyledProductCategory>
          </Box>
        </Hidden>

        {/* Main Content */}
        <Box flex="1">
          {/* Back to Communities link */}
          <Box display="flex" alignItems="center" marginBottom="16px">
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#0061F2', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Box display="flex" alignItems="center" justifyContent="center" width={16} height={16} mr="8px">
                <NextImage src={ArrowBackIos} alt="back arrow" width={11} height={11} />
              </Box>
              Back to Communities
            </span>
          </Box>

          {/* Image Container */}
          <Box position="relative" width="100%" height="300px" borderRadius="8px" overflow="hidden" marginBottom="20px">
            <NextImage src="/images/image 1.jpg" alt="Community Banner" layout="fill" objectFit="cover" />

            {/* Community Title Overlay */}
            <Box position="absolute" bottom={0} left={0} padding="16px" bg="rgba(0, 0, 0, 0.5)" color="white" width="100%">
              <h1>Green SME Network</h1>
            </Box>
          </Box>

          <Box
            padding="16px"
            bg="#f8f9fa"
            borderRadius="8px"
            shadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="20px"
          >
            <p style={{ marginRight: '16px', maxWidth: '70%', fontSize: '14px', color: '#212529' }}>A community focused on climate innovation, green growth, and sustainable business. Let's shape a better tomorrow 🌍</p>
            <button style={{ backgroundColor: "#0061F2", color: "white", padding: "8px 16px", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: '14px', fontWeight: 500 }}>Join Community</button>
          </Box>

          {/* NEW SECTION: Discussions, About, Events & Groups */}
          <FlexBox flexWrap="wrap" mt="20px"> 
            <Box flex="1" padding="20px" maxWidth="100%" minWidth="0">
              <Box bg="white"  borderRadius={8}>
                {/* Tabs */}
                <FlexBox borderBottom="1px solid #e0e0e0" mb="20px" shadow={6} flexWrap="wrap" justifyContent="space-between">
                  <Box
                    flex="1" minWidth="0" p="10px 15px"
                    cursor="pointer"
                    onClick={() => setSelected("discussions")}
                    style={{
                      borderBottom: selected === "discussions" ? '2px solid #0061F2' : 'none',
                      color: selected === "discussions" ? '#0061F2' : '#6C757D',
                      fontWeight: selected === "discussions" ? 600 : 400,
                    }}
                  >
                    Discussions
                  </Box>
                  <Box
                    flex="1" minWidth="0" p="10px 15px"
                    cursor="pointer"
                    onClick={() => setSelected("about")}
                    style={{
                      borderBottom: selected === "about" ? '2px solid #0061F2' : 'none',
                      color: selected === "about" ? '#0061F2' : '#6C757D',
                      fontWeight: selected === "about" ? 600 : 400,
                    }}
                  >
                    About
                  </Box>
                  <Box
                    flex="1" minWidth="0" p="10px 15px"
                    cursor="pointer"
                    onClick={() => setSelected("events")}
                    style={{
                      borderBottom: selected === "events" ? '2px solid #0061F2' : 'none',
                      color: selected === "events" ? '#0061F2' : '#6C757D',
                      fontWeight: selected === "events" ? 600 : 400,
                    }}
                  >
                    Events
                  </Box>
                </FlexBox>

                {/* Content based on selected tab */}
                {selected === "discussions" && (
                  <Box>
                    {/* Start a discussion input */}
                    <Box bg="#f8f9fa" borderRadius="8px" p="15px" mb="20px" border="1px solid #e0e0e0">
                      <input
                        type="text"
                        placeholder="Start a discussion in this community"
                        style={{
                          width: '100%',
                          border: '1px solid #808390',
                          borderRadius: '8px',
                          outline: 'none',
                          backgroundColor: 'transparent',
                          fontSize: '14px',
                          color: '#808390',
                          padding: '12px 15px',
                        }}
                      />
                      <FlexBox mt="15px" justifyContent="space-between" alignItems="center">
                        <FlexBox>
                          <Box width={24} height={24} display="flex" justifyContent="center" alignItems="center" mr="10px">
                            <NextImage src="/assets/images/community Marketplace Details/Image.svg" alt="image" width={20} height={20} />
                          </Box>
                          <Box width={24} height={24} display="flex" justifyContent="center" alignItems="center" mr="10px">
                            <NextImage src="/assets/images/community Marketplace Details/PlayCircle.svg" alt="video" width={20} height={20} />
                          </Box>
                          <Box width={24} height={24} display="flex" justifyContent="center" alignItems="center" mr="10px">
                            <NextImage src="/assets/images/community Marketplace Details/Paperclip.svg" alt="link" width={20} height={20} />
                          </Box>
                        </FlexBox>
                        <button style={{ backgroundColor: "#0061F2", color: "white", padding: "8px 20px", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: '14px', fontWeight: 500 }}>Post</button>
                      </FlexBox>
                    </Box>

                    {/* Discussion List */}
                    {discussions.map((discussion) => (
                      <Box key={discussion.id} bg="white" borderRadius="8px" p="15px" mb="15px" border="1px solid #e0e0e0">
                        <FlexBox alignItems="center" mb="10px" justifyContent="space-between">
                          <FlexBox alignItems="center">
                           
                            <Box width={32} height={32} borderRadius="50%" bg="#e0e0e0" mr="10px"></Box>
                            <Box>
                              <span style={{ fontWeight: 600, fontSize: '14px', color: '#212529' }}>{discussion.author}</span>
                              <span style={{ fontSize: '12px', color: '#6C757D', marginLeft: '8px' }}>{discussion.time}</span>
                            </Box>
                          </FlexBox>
                        
                          <Box cursor="pointer">...</Box>
                        </FlexBox>
                        <p style={{ fontSize: '14px', color: '#212529', lineHeight: '1.5' }}>{discussion.content}</p>
                        <span style={{ fontSize: '12px', color: '#6C757D' }}>Join community to interact with all posts</span>
                      </Box>
                    ))}
                  </Box>
                )}
                {/* about section */}
                {selected === "about" && (
                  <Box>
                    <Box bg="white" shadow={6} borderRadius="8px" p="20px" mb="20px"> 
                      <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px', color: '#212529' }}>About this Community</h2>
                   
                      <Box style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '20px' }}></Box>
                      <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#212529' }}>
                        This community brings together sustainability professionals, carbon market experts, and SME leaders who are navigating the complex world of carbon credits and environmental compliance. We share best practices, discuss market trends, and support each other in building more sustainable businesses.
                      </p>
                    </Box>
                    <Box bg="white" shadow={6} borderRadius="8px" p="20px">
                      <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '10px', color: '#212529' }}>Community Guidelines</h3>
                      <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '15px', color: '#212529' }}>
                        To ensure a productive and welcoming environment for all members, we ask everyone to follow these community guidelines:
                      </p>

                      {guidelines.map((section, index) => (
                        <Box key={section.title} mb="15px">
                          <FlexBox
                            alignItems="center"
                            justifyContent="space-between"
                            cursor="pointer"
                            onClick={() => toggleGuidelinesSection(section.title)}
                            style={{ paddingBottom: '10px', borderBottom: index < guidelines.length - 1 ? '1px solid #e0e0e0' : 'none' }}
                          >
                            <span style={{ fontSize: '14px', fontWeight: 500, color: '#6C757D' }}>{section.title}</span>
                            {/* <NextImage
                              src={`/assets/images/community Marketplace Details/${expandedSection === section.title ? 'arrow-up.svg' : 'arrow-down.svg'}`}
                              alt="toggle"
                              width={16}
                              height={16}
                            /> */}
                          </FlexBox>
                          {expandedSection === section.title && section.content.length > 0 && (
                            <Box mt="10px" pl="15px">
                              <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '13px', color: '#6C757D' }}>
                                {section.content.map((item, i) => (
                                  <li key={i} style={{ marginBottom: '5px' }}>{item}</li>
                                ))}
                              </ul>
                            </Box>
                          )}
                        </Box>
                      ))}

                      <Box bg="#e6f0ff" p="15px" borderRadius="8px" textAlign="center" mt="20px">
                        <p style={{ fontSize: '13px', color: '#0061F2', lineHeight: '1.4' }}>
                          By participating in this community, you agree to abide by these guidelines.<br/>
                          Repeated violations may result in temporary or permanent removal from the group.
                        </p>
                      </Box>
                    </Box>
                  </Box>
                )}
              {selected === "events" && (
                <Box>
                  <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', marginBottom: '15px' }}>
                    Upcoming Events
                  </h2>
                  <Box
                    style={{
                      borderBottom: '1px solid #E0E0E0',
                      marginBottom: '25px',
                    }}
                  />

                  {events.length > 0 ? (
                    <Grid container spacing={3}>
                      {events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event.id}>
                          <Box bg="white" shadow={6} borderRadius={8} overflow="hidden">
                            {/* Image container */}
                            <Box position="relative" width="100%" height="180px" borderRadius="8px 8px 0 0" overflow="hidden">
                              <NextImage src={event.imageSrc} alt={event.title} layout="responsive" objectFit="cover" width={16} height={9} />
                              {event.type && (
                                <Box position="absolute" top="10px" left="10px" bg="rgba(0,0,0,0.6)" color="white" px="8px" py="4px" borderRadius="4px" fontSize="12px" fontWeight={500}>
                                  {event.type}
                                </Box>
                              )}
                            </Box>
                            <Box p="15px">
                              <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#212529', marginBottom: '10px' }}>
                                {event.title}
                              </h4>
                              <FlexBox alignItems="center" mt="10px" mb="5px">
                                <Box width={16} height={16} mr="8px" display="flex" alignItems="center" justifyContent="center">
                                  <NextImage src="/assets/images/community Marketplace Details/calendar_month.svg" alt="calendar" width={16} height={16} />
                                </Box>
                                <p style={{ fontSize: '13px', color: '#6C757D' }}>{event.date}, {event.time}</p>
                              </FlexBox>
                              <FlexBox alignItems="center" mb="15px">
                                <Box width={16} height={16} mr="8px" display="flex" alignItems="center" justifyContent="center">
                                  <NextImage src="/assets/images/community Marketplace Details/location_on.svg" alt="location" width={16} height={16} />
                                </Box>
                                <p style={{ fontSize: '13px', color: '#6C757D' }}>{event.location}</p>
                              </FlexBox>
                              <button style={{
                                backgroundColor: "#A8C3FF",
                                color: "white",
                                padding: "8px 20px",
                                border: "1px solid #A8C3FF",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: '14px',
                                fontWeight: 500,
                                transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#A8C3FF';
                                e.currentTarget.style.borderColor = '#A8C3FF';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#A8C3FF';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.borderColor = '#A8C3FF';
                              }}
                              >
                                Register
                              </button>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <p style={{ fontSize: '14px', color: '#6C757D' }}>No upcoming events.</p>
                  )}
                </Box>
              )}
                
              </Box>
            </Box>

            {/* Right Column: Groups - Conditionally rendered */}
            {selected === "discussions" && (
              <Box flex="1" minWidth="0" padding="0 20px" style={{ maxWidth: '280px' }}>
                <Box bg="white" shadow={6} borderRadius={8} p="20px">
                  <FlexBox justifyContent="space-between" alignItems="center" mb="20px">
                    <span style={{ fontSize: '16px', fontWeight: 600, color: '#212529' }}>Groups</span>
                    {/* User Profile Icon */}
                    <Box width={60} height={60} overflow="hidden">
                      <NextImage src="assets/images/community Marketplace Details/EJP AI Advisor.svg" alt="user profile" width={80} height={80} layout="responsive" />
                    </Box>
                  </FlexBox>
                  <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '15px' }}>Discover groups in the community</p>

                  {/* Groups List */}
                  {groups.map((group) => (
                    <FlexBox
                      key={group.id}
                      alignItems="center"
                      mb="10px"
                      p="8px"
                      borderRadius="8px"
                      bg={selectedGroup === group.id ? "#e6f0ff" : "transparent"}
                      onClick={() => setSelectedGroup(group.id)}
                      cursor="pointer"
                      justifyContent="space-between"
                    >
                      <FlexBox alignItems="center">
                        {/* Placeholder for group icon */}
                        <Box width={24} height={24} display="flex" justifyContent="center" alignItems="center" mr="10px" bg="#f0f2f5" borderRadius="4px">
                          <NextImage src="/assets/images/community Marketplace Details/money_bag.svg" alt="folicon" width={16} height={16} />
                        </Box>
                        <span style={{ fontSize: '14px', color: '#212529' }}>{group.name}</span>
                      </FlexBox>
                      <Box cursor="pointer">...</Box>
                    </FlexBox>
                  ))}
                </Box>
              </Box>
            )}
            {selected === "about" && (
              <Box flex="1" minWidth="0" padding="0 20px" style={{ maxWidth: '280px' }}>
                {/* Overview Section */}
                <Box bg="white" shadow={6} borderRadius={8} p="20px" mb="20px">
                  <FlexBox justifyContent="space-between" alignItems="center" mb="20px">
                    <span style={{ fontSize: '16px', fontWeight: 600, color: '#212529' }}>Overview</span>
                    <Box width={60} height={60}  overflow="hidden">
                      <NextImage src="/assets/images/community Marketplace Details/EJP AI Advisor.svg" alt="user profile" width={80} height={80} layout="responsive" />
                      <Box
                        position="absolute"
                        top={0}
                        right={0}
                        bg="#0061F2"
                        color="white"
                        borderRadius="50%"
                        width="16px"
                        height="16px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="10px"
                        fontWeight="bold"
                        zIndex={1}
                        style={{ transform: 'translate(25%, -25%)' }}
                      >
                        1
                      </Box>
                    </Box>
                  </FlexBox>
                  <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '20px', marginTop: '-2rem' }}>View community details</p>
                  <Box style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '20px' }}></Box>
                  <FlexBox alignItems="center" mb="10px">
                    <Box width={20} height={20} mr="10px">
                      <NextImage src="/assets/images/community Marketplace Details/calendar_today.svg" alt="calendar" width={20} height={20} />
                    </Box>
                    <span style={{ fontSize: '14px', color: '#898E9E' }}>Created December 2023</span>
                  </FlexBox>

                  <FlexBox alignItems="center" mb="20px">
                    <Box width={20} height={20} mr="10px">
                      <NextImage src="/assets/images/community Marketplace Details/group.svg" alt="members" width={20} height={20} />
                    </Box>
                    <span style={{ fontSize: '14px', color: '#898E9E' }}>3.2k Members</span>
                  </FlexBox>
                </Box>

                <Box bg="white" shadow={6} borderRadius={8} p="20px">
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: '#212529' }}>Members</h3>
                  <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '15px' }}>View members in this community</p>
                  <Box style={{ borderBottom: '1px solid #e0e0e0', marginTop: '20px', marginBottom: '20px' }}></Box>
                  <input
                    type="text"
                    placeholder="Search members..."
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #B1B4BB',
                      borderRadius: '8px',
                      marginBottom: '15px',
                      fontSize: '14px',
                      color: '#B1B4BB',
                    }}
                  />
                  <Box style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '20px' }}></Box>
            
                  <FlexBox alignItems="center" mb="10px">
                    <Box width={40} height={40} borderRadius="50%" overflow="hidden" mr="10px">
                      <NextImage src="/assets/images/community Marketplace Details/Avatar.svg" alt="member" width={40} height={40} />
                    </Box>
                    <Box>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#212529' }}>Karim Abdullah</span>
                      <span style={{ fontSize: '12px', backgroundColor: '#FFE4E6', color: '#C15B76', padding: '3px 8px', borderRadius: '4px', marginLeft: '8px' }}>Admin</span>
                    </Box>
                  </FlexBox>

                  <FlexBox alignItems="center" mb="10px">
                    <Box width={40} height={40} borderRadius="50%" overflow="hidden" mr="10px">
                      <NextImage src="/assets/images/community Marketplace Details/Avatar 2.svg" alt="member" width={40} height={40} />
                    </Box>
                    <Box>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#212529' }}>Layla Hassan</span>
                      <span style={{ fontSize: '12px', backgroundColor: '#FEF3C7', color: '#A05827', padding: '3px 8px', borderRadius: '4px', marginLeft: '8px' }}>Moderator</span>
                    </Box>
                  </FlexBox>

                  <FlexBox alignItems="center" mb="20px">
                    <Box width={40} height={40} borderRadius="50%" overflow="hidden" mr="10px">
                      <NextImage src="/assets/images/community Marketplace Details/Avatar 1.svg" alt="member" width={40} height={40} />
                    </Box>
                    <Box>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#212529' }}>Omar Al-Farouq</span>
                      <span style={{ fontSize: '12px', backgroundColor: '#FEF3C7', color: '#A05827', padding: '3px 8px', borderRadius: '4px', marginLeft: '8px' }}>Moderator</span>
                    </Box>
                  </FlexBox>

                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#898E9E', cursor: 'pointer', paddingTop: '10px', borderTop: '1px solid #EBECEF', display: 'block' }}>Join community to view all members</span>
                  </Box>
              </Box>
            )}

          </FlexBox>
        </Box>
      </FlexBox>
    </Container>
  );
}