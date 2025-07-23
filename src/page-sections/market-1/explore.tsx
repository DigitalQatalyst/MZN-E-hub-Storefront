"use client";

import React from 'react';
import './explore.css';
import Box from "@component/Box";
import NextImage from "@component/NextImage";
import StyledProductCategory from "./styled";

const WomenInBusiness = () => {
  return (
    <div className="container">
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
 <div className="main-content-wrapper">
      <div className="topNav">
        <div className="navLinks">
          <button className="navButton">
            <img src="/images/trending-up.svg" alt="Trending Icon" className="navIcon" /> Trending
          </button>
          <button className="navButton">
            <img src="/images/clock.svg" alt="Recently Added Icon" className="navIcon" /> Recently Added
          </button>
          <button className="navButton">
            <img src="/images/star2.svg" alt="Popular Icon" className="navIcon" /> Popular
          </button>
        </div>
        <input type="text" placeholder="Search" className="searchBar" />
      </div>

      <div className="mainNav">
        <button className="mainNavButton">
          <img src="/images/brand_awareness.svg" alt="Promo Zone" className="icon" /> Promo Zone
        </button>
        <button className="mainNavButton">
          <img src="/images/indeterminate_question_box.svg" alt="Ask the Community" className="icon" /> Ask the Community
        </button>
        <button className="mainNavButton active">
          <img src="/images/face_4.svg" alt="Women in Business" className="icon" /> Women in Business
        </button>
        <button className="mainNavButton">
          <img src="/images/rocket_launch.svg" alt="Next Gen Hustle" className="icon" /> Next Gen Hustle
        </button>
        <button className="mainNavButton">
          <img src="/images/airport_shuttle.svg" alt="Car Connect" className="icon" /> Car Connect
        </button>
        <button className="mainNavButton">
          <img src="/images/Palette.svg" alt="Creative Media Exchange" className="icon" /> Creative Media Exchange
        </button>
        {/* <button className="mainNavButton">
          <img src="/images/partner_exchange.svg" alt="More" className="icon" />
        </button> */}
      </div>

      <div className="header">
        <h1 className="title">Women in Business</h1>
        <button className="followSpaceButton">Follow Space</button>
      </div>
      <p className="description">
        Support, visibility, and resources for female entrepreneurs in the UAE to thrive in their ventures, connect with like-minded innovators, access expert mentorship and funding opportunities, and build sustainable businesses that contribute meaningfully to the region's economic growth.
      </p>

      <h2 className="sectionTitle">Featured Women in Business Communities</h2>
      <div className="communityGrid">
        <div className="communityCard">
          <div className="cardHeader">
            <img src="/images/avatar.png" alt="Avatar" className="avatar" />
            <div className="cardInfo">
              <h3 className="cardTitle">Women in Business AbuDhabi</h3>
              <p className="cardMembers">10k+ Members</p>
            </div>
            <button className="joinButton">Join</button>
          </div>
          <p className="cardDescription">
            A community focused on empowering women entrepreneurs, offering resources, networking, and support for business growth and leadership in...
          </p>
        </div>

        <div className="communityCard">
          <div className="cardHeader">
            <img src="/images/avatar.png" alt="Avatar" className="avatar" />
            <div className="cardInfo">
              <h3 className="cardTitle">Women in Technology & Innovation</h3>
              <p className="cardMembers">10k+ Members</p>
            </div>
            <button className="joinButton">Join</button>
          </div>
          <p className="cardDescription">
            A network for women leading the charge in technology and innovation, driving digital transformation and fostering tech entrepreneurship.
          </p>
        </div>

        <div className="communityCard">
          <div className="cardHeader">
            <img src="/images/avatar.png" alt="Avatar" className="avatar" />
            <div className="cardInfo">
              <h3 className="cardTitle">Women in Finance & Investment</h3>
              <p className="cardMembers">10k+ Members</p>
            </div>
            <button className="joinButton">Join</button>
          </div>
          <p className="cardDescription">
            A community dedicated to women in finance, providing resources, mentorship, and networking opportunities for investment professionals and entrepreneurs.
          </p>
        </div>

        <div className="communityCard">
          <div className="cardHeader">
            <img src="/images/avatar.png" alt="Avatar" className="avatar" />
            <div className="cardInfo">
              <h3 className="cardTitle">Women in Retail & E-Commerce</h3>
              <p className="cardMembers">10k+ Members</p>
            </div>
            <button className="joinButton">Join</button>
          </div>
          <p className="cardDescription">
            A community for female entrepreneurs in retail and e-commerce, sharing strategies for business growth, digital marketing, and consumer engagement in the UAE.
          </p>
        </div>
      </div>
      <button className="showMoreButton">Show more</button>

      <h2 className="sectionTitle">Women Innovators & Founders</h2>
      <div className="communityGrid">
        <div className="communityCard">
          <div className="cardHeader">
            <img src="/images/avatar.png" alt="Avatar" className="avatar" />
            <div className="cardInfo">
              <h3 className="cardTitle">Female Founders in Fintech</h3>
              <p className="cardMembers">10k+ Members</p>
            </div>
            <button className="joinButton">Join</button>
          </div>
          <p className="cardDescription">
            A hub for women revolutionizing the financial services industry through fintech solutions, offering insights into investment strategies and tech...
          </p>
        </div>

        <div className="communityCard">
          <div className="cardHeader">
            <img src="/images/avatar.png" alt="Avatar" className="avatar" />
            <div className="cardInfo">
              <h3 className="cardTitle">AI & Machine Learning Innovators</h3>
              <p className="cardMembers">10k+ Members</p>
            </div>
            <button className="joinButton">Join</button>
          </div>
          <p className="cardDescription">
            A community dedicated to women developing cutting-edge AI and machine learning technologies, creating solutions across industries like healthcare...
          </p>
        </div>

        <div className="communityCard">
          <div className="cardHeader">
            <img src="/images/avatar.png" alt="Avatar" className="avatar" />
            <div className="cardInfo">
              <h3 className="cardTitle">EdTech Founders Network</h3>
              <p className="cardMembers">10k+ Members</p>
            </div>
            <button className="joinButton">Join</button>
          </div>
          <p className="cardDescription">
            For women in the education technology space, sharing ideas, solutions, and strategies for improving learning through innovation and technology.
          </p>
        </div>

        <div className="communityCard">
          <div className="cardHeader">
            <img src="/images/avatar.png" alt="Avatar" className="avatar" />
            <div className="cardInfo">
              <h3 className="cardTitle">Social Impact Entrepreneurs</h3>
              <p className="cardMembers">10k+ Members</p>
            </div>
            <button className="joinButton">Join</button>
          </div>
          <p className="cardDescription">
            A community for women who are combining business with social impact, striving to address pressing societal challenges while building profitable...
          </p>
        </div>
      </div>
      <button className="showMoreButton">Show more</button>
      </div>
    </div>
  );
};

export default WomenInBusiness;
