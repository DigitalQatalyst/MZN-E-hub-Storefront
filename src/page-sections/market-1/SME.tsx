"use client";

import { useState } from "react";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import NextImage from "@component/NextImage";
import { ProductCard1 } from "@component/product-cards"; // Assuming this is still used somewhere or can be removed if not
import CategorySectionHeader from "@component/CategorySectionHeader"; // Assuming this is still used somewhere or can be removed if not
import StyledProductCategory from "./styled"; // Assuming this is your styled component for categories
import Brand from "@models/Brand.model"; // Assuming these models are still relevant
import Product from "@models/product.model"; // Assuming these models are still relevant
import ArrowBackIos from "/public/assets/images/community Marketplace Details/arrow_back_ios.svg"; // Make sure this path is correct for the SVG


// ==============================================================
type Props = { carList: Product[]; carBrands: Brand[] };
// ==============================================================

export default function Section6({ carList, carBrands }: Props) {
  const [selected, setSelected] = useState("discussions"); // State for tabs: "discussions", "about", "events"
  const [selectedGroup, setSelectedGroup] = useState(""); // State for selected group in the sidebar

  // Dummy data for discussions and groups (replace with actual data fetching)
  const discussions = [
    {
      id: "1",
      author: "Black Rock",
      time: "34 mins",
      content: "These experiences are shaping how we approach Scope 3 emissions and build partnerships across markets. Let's continue the conversation on how small actions can lead to scalable climate impact...Read more",
      // You might add more fields like authorImage, likes, comments, etc.
    },
    // Add more discussion objects as needed
  ];

  const groups = [
    { id: "esg-compliance", name: "ESG Compliance Help" },
    { id: "carbon-credit", name: "Carbon Credit Conversations" },
    { id: "local-supply-chains", name: "Local Supply Chains" },
    { id: "funding-grants", name: "Funding & Grants" },
    { id: "esg-policy-exchange", name: "ESG Policy Exchange" },
    { id: "green-energy-solutions", name: "Green Energy Solutions" },
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
          <Box shadow={6} borderRadius={10} padding="1.25rem" bg="white" minWidth="280px"> {/* Added minWidth for sidebar */}
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
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#0061F2', cursor: 'pointer', display: 'flex', alignItems: 'center' }}> {/* Added display:flex and alignItems:center here */}
              <Box display="flex" alignItems="center" justifyContent="center" width={16} height={16} mr="8px"> {/* Added a wrapper Box for the icon */}
                <NextImage src={ArrowBackIos} alt="back arrow" width={11} height={11} /> {/* Removed layout="responsive" and adjusted height */}
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

          {/* Description and Join Community Button */}
          <Box
            padding="16px"
            bg="#f8f9fa" // Light gray background
            borderRadius="8px"
            boxShadow="0px 2px 10px rgba(0, 0, 0, 0.1)"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="20px" // Added margin-bottom to create space before the new section
          >
            <p style={{ marginRight: '16px', maxWidth: '70%', fontSize: '14px', color: '#212529' }}>A community focused on climate innovation, green growth, and sustainable business. Let's shape a better tomorrow 🌍</p>
            <button style={{ backgroundColor: "#0061F2", color: "white", padding: "8px 16px", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: '14px', fontWeight: 500 }}>Join Community</button>
          </Box>

          {/* NEW SECTION: Discussions, About, Events & Groups */}
          <FlexBox flexWrap="wrap" mt="20px"> {/* Added margin-top for spacing from the above section */}
            {/* Left Column: Discussions, About, Events */}
            <Box flex="3" mr="20px" minWidth="0"> {/* flex:3 for discussions, minWidth:0 to prevent overflow */}
              <Box bg="white" shadow={6} borderRadius={8} p="20px">
                {/* Tabs */}
                <FlexBox borderBottom="1px solid #e0e0e0" mb="20px">
                  <Box
                    p="10px 15px"
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
                    p="10px 15px"
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
                    p="10px 15px"
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
                          border: 'none',
                          outline: 'none',
                          backgroundColor: 'transparent',
                          fontSize: '14px',
                          color: '#212529',
                        }}
                      />
                      <FlexBox mt="15px" justifyContent="space-between" alignItems="center">
                        <FlexBox>
                          <Box width={24} height={24} display="flex" justifyContent="center" alignItems="center" mr="10px">
                            <NextImage src="/assets/images/community Marketplace Details/Image.svg" alt="image" width={20} height={20} /> {/* Replace with actual icons */}
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
                            {/* Dummy Author Image */}
                            <Box width={32} height={32} borderRadius="50%" bg="#e0e0e0" mr="10px"></Box>
                            <Box>
                              <span style={{ fontWeight: 600, fontSize: '14px', color: '#212529' }}>{discussion.author}</span>
                              <span style={{ fontSize: '12px', color: '#6C757D', marginLeft: '8px' }}>{discussion.time}</span>
                            </Box>
                          </FlexBox>
                          {/* More Options Icon (three dots) */}
                          <Box cursor="pointer">...</Box>
                        </FlexBox>
                        <p style={{ fontSize: '14px', color: '#212529', lineHeight: '1.5' }}>{discussion.content}</p>
                        <span style={{ fontSize: '12px', color: '#6C757D' }}>Join community to interact with all posts</span>
                      </Box>
                    ))}
                  </Box>
                )}
                {/* Add content for "About" and "Events" tabs similarly */}
              </Box>
            </Box>

            {/* Right Column: Groups */}
            <Box flex="1" minWidth="280px" mt="20px"> {/* minWidth to ensure it doesn't get too small on smaller screens */}
              <Box bg="white" shadow={6} borderRadius={8} p="20px">
                <FlexBox justifyContent="space-between" alignItems="center" mb="20px">
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#212529' }}>Groups</span>
                  {/* User Profile Icon */}
                  <Box width={60} height={60} borderRadius="50%" overflow="hidden"> 
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
                    bg={selectedGroup === group.id ? "#e6f0ff" : "transparent"} // Highlight selected group
                    onClick={() => setSelectedGroup(group.id)}
                    cursor="pointer"
                    justifyContent="space-between"
                  >
                    <FlexBox alignItems="center">
                      {/* Placeholder for group icon */}
                      <Box width={24} height={24} display="flex" justifyContent="center" alignItems="center" mr="10px" bg="#f0f2f5" borderRadius="4px">
                        <NextImage src="/assets/images/community Marketplace Details/money_bag.svg" alt="folicon" width={16} height={16} /> {/* Replace with actual folder icon */}
                      </Box>
                      <span style={{ fontSize: '14px', color: '#212529' }}>{group.name}</span>
                    </FlexBox>
                    {/* More Options Icon (three dots) */}
                    <Box cursor="pointer">...</Box>
                  </FlexBox>
                ))}
              </Box>
            </Box>
          </FlexBox>
        </Box>
      </FlexBox>
    </Container>
  );
}