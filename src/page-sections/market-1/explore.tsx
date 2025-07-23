"use client";

import React, { useState } from 'react';
import './explore.css';
import Box from "@component/Box";
import NextImage from "@component/NextImage";
import StyledProductCategory from "./styled";

const WomenInBusiness = () => {
  const [sidebarSelected, setSidebarSelected] = useState("explore");
  const [selectedNavLink, setSelectedNavLink] = useState("trending");
  const [selectedMainNavLink, setSelectedMainNavLink] = useState("women-in-business");

  return (
    <div className="container">
      {/* Sidebar */}
      <Box borderRight="1px solid var(--Gray-20, #E2E8F0)" padding="1.25rem" bg="white" minWidth="280px" className="sidebar">
        {/* Home Section */}
        <StyledProductCategory>
          <Box
            display="flex"
            alignItems="center"
            padding="12px"
            borderRadius="8px"
            width="100%"
            maxWidth="280px"
            style={{
              cursor: 'pointer',
              background: sidebarSelected === "home" ? '#0030E3' : 'transparent',
              color: sidebarSelected === "home" ? 'white' : '#6C757D'
            }}
            onClick={() => setSidebarSelected("home")}
          >
            <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill={sidebarSelected === "home" ? "white" : "#6C757D"} />
              </svg>
            </Box>
            <span style={{ fontSize: '14px', fontWeight: sidebarSelected === "home" ? 600 : 400 }}>Home</span>
          </Box>
        </StyledProductCategory>

        {/* Explore Section */}
        <StyledProductCategory>
          <Box
            display="flex"
            alignItems="center"
            padding="12px"
            borderRadius="8px"
            width="100%"
            maxWidth="280px"
            style={{
              cursor: 'pointer',
              background: sidebarSelected === "explore" ? '#0030E3' : 'transparent',
              color: sidebarSelected === "explore" ? 'white' : '#6C757D'
            }}
            onClick={() => setSidebarSelected("explore")}
          >
            <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_7497_78301" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_7497_78301)">
                  <path
                    d="M7.80039 16.1984L14.4004 14.3984L16.2004 7.79844L9.60039 9.59844L7.80039 16.1984ZM12.0004 13.1984C11.6671 13.2151 11.3837 13.1044 11.1504 12.8662C10.9171 12.628 10.8004 12.3388 10.8004 11.9984C10.8004 11.6651 10.9171 11.3818 11.1504 11.1484C11.3837 10.9151 11.6671 10.7984 12.0004 10.7984C12.3337 10.7984 12.6171 10.9151 12.8504 11.1484C13.0837 11.3818 13.2004 11.6651 13.2004 11.9984C13.2004 12.3318 13.0837 12.6151 12.8504 12.8484C12.6171 13.0818 12.3337 13.1984 12.0004 13.1984ZM12.0074 21.5984C10.6861 21.5984 9.44206 21.3484 8.27539 20.8484C7.10872 20.3484 6.08789 19.6609 5.21289 18.7859C4.33789 17.9109 3.65039 16.8904 3.15039 15.7244C2.65039 14.5584 2.40039 13.3126 2.40039 11.9869C2.40039 10.6613 2.65039 9.41927 3.15039 8.26094C3.65039 7.1026 4.33789 6.08594 5.21289 5.21094C6.08789 4.33594 7.10839 3.64844 8.27439 3.14844C9.44039 2.64844 10.6862 2.39844 12.0119 2.39844C13.3376 2.39844 14.5796 2.64844 15.7379 3.14844C16.8962 3.64844 17.9129 4.33594 18.7879 5.21094C19.6629 6.08594 20.3504 7.10444 20.8504 8.26644C21.3504 9.4286 21.6004 10.6703 21.6004 11.9914C21.6004 13.3128 21.3504 14.5568 20.8504 15.7234C20.3504 16.8901 19.6629 17.9109 18.7879 18.7859C17.9129 19.6609 16.8944 20.3484 15.7324 20.8484C14.5702 21.3484 13.3286 21.5984 12.0074 21.5984Z"
                    fill={sidebarSelected === "explore" ? "white" : "#6C757D"}
                  />
                </g>
              </svg>
            </Box>
            <span style={{ fontSize: '14px', fontWeight: sidebarSelected === "explore" ? 600 : 400 }}>Explore</span>
          </Box>
        </StyledProductCategory>

        {/* My Communities Section */}
        <StyledProductCategory>
          <Box
            display="flex"
            alignItems="center"
            padding="12px"
            borderRadius="8px"
            width="100%"
            maxWidth="280px"
            style={{
              cursor: 'pointer',
              background: sidebarSelected === "my-communities" ? '#0030E3' : 'transparent',
              color: sidebarSelected === "my-communities" ? 'white' : '#6C757D'
            }}
            onClick={() => setSidebarSelected("my-communities")}
          >
            <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4C16 6.21 14.21 8 12 8C9.79 8 8 6.21 8 4C8 1.79 9.79 0 12 0C14.21 0 16 1.79 16 4ZM4 4C4 5.1 4.9 6 6 6C7.1 6 8 5.1 8 4C8 2.9 7.1 2 6 2C4.9 2 4 2.9 4 4ZM18 10.2C18.6 10.7 19 11.4 19 12.2V16H15V12C15 11.4 14.9 10.8 14.7 10.3C15.9 10.1 17 10.1 18 10.2ZM12 10C15.3 10 18 11.3 18 13V16H6V13C6 11.3 8.7 10 12 10ZM6 10C6.7 10 7.4 10.1 8 10.2C7.2 10.9 6.7 11.9 6.7 13V16H1V12.2C1 11.4 1.4 10.7 2 10.2C3 10.1 4.1 10.1 5.3 10.3C5.1 10.8 5 11.4 5 12V16H6V10Z" fill={sidebarSelected === "my-communities" ? "white" : "#6C757D"} />
              </svg>
            </Box>
            <span style={{ fontSize: '14px', fontWeight: sidebarSelected === "my-communities" ? 600 : 400 }}>My Communities</span>
          </Box>
        </StyledProductCategory>

        {/* Notifications Section */}
        <StyledProductCategory>
          <Box
            display="flex"
            alignItems="center"
            padding="12px"
            borderRadius="8px"
            width="100%"
            maxWidth="280px"
            style={{
              cursor: 'pointer',
              background: sidebarSelected === "notifications" ? '#0030E3' : 'transparent',
              color: sidebarSelected === "notifications" ? 'white' : '#6C757D'
            }}
            onClick={() => setSidebarSelected("notifications")}
          >
            <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2C6.69 2 4 4.69 4 8V12L2 14V15H18V14L16 12V8C16 4.69 13.31 2 10 2ZM10 20C11.1 20 12 19.1 12 18H8C8 19.1 8.9 20 10 20Z" fill={sidebarSelected === "notifications" ? "white" : "#6C757D"} />
              </svg>
            </Box>
            <span style={{ fontSize: '14px', fontWeight: sidebarSelected === "notifications" ? 600 : 400 }}>Notifications</span>
          </Box>
        </StyledProductCategory>

        {/* Messages Section */}
        <StyledProductCategory>
          <Box
            display="flex"
            alignItems="center"
            padding="12px"
            borderRadius="8px"
            width="100%"
            maxWidth="280px"
            style={{
              cursor: 'pointer',
              background: sidebarSelected === "messages" ? '#0030E3' : 'transparent',
              color: sidebarSelected === "messages" ? 'white' : '#6C757D'
            }}
            onClick={() => setSidebarSelected("messages")}
          >
            <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2H18C19.1 2 20 2.9 20 4V16C20 17.1 19.1 18 18 18H2C0.9 18 0 17.1 0 16V4C0 2.9 0.9 2 2 2ZM2 6V16H18V6L10 11L2 6ZM2 4L10 9L18 4H2Z" fill={sidebarSelected === "messages" ? "white" : "#6C757D"} />
              </svg>
            </Box>
            <span style={{ fontSize: '14px', fontWeight: sidebarSelected === "messages" ? 600 : 400 }}>Messages</span>
          </Box>
        </StyledProductCategory>
      </Box >

      {/* Main Content */}
      < div className="main-content-wrapper" >
        {sidebarSelected === "explore" && (
          <>
            <div className="topNav">
              <div className="navLinks">
                <button className={`navButton ${selectedNavLink === "trending" ? "active-nav-link" : ""}`}
                  onClick={() => setSelectedNavLink("trending")}>
                  <img src="/images/trending-up.svg" alt="Trending Icon" className="navIcon" style={{ filter: selectedNavLink === "trending" ? "brightness(0) invert(1)" : "none" }} /> Trending
                </button>
                <button className={`navButton ${selectedNavLink === "recently-added" ? "active-nav-link" : ""}`}
                  onClick={() => setSelectedNavLink("recently-added")}
                >
                  <img src="/images/clock.svg" alt="Recently Added Icon" className="navIcon" style={{ filter: selectedNavLink === "recently-added" ? "brightness(0) invert(1)" : "none" }}
                  /> Recently Added
                </button>
                <button className={`navButton ${selectedNavLink === "popular" ? "active-nav-link" : ""}`}
                  onClick={() => setSelectedNavLink("popular")}
                >
                  <img src="/images/star2.svg" alt="Popular Icon" className="navIcon" style={{ filter: selectedNavLink === "popular" ? "brightness(0) invert(1)" : "none" }}
                  /> Popular
                </button>
              </div>
              <input type="text" placeholder="Search" className="searchBar" />
            </div>

            <div className="mainNav">
              <button
                className={`mainNavButton ${selectedMainNavLink === "promo-zone" ? "active" : ""}`}
                onClick={() => setSelectedMainNavLink("promo-zone")}
              >
                <img
                  src="/images/brand_awareness.svg"
                  alt="Promo Zone"
                  className="icon"
                  style={{ filter: selectedMainNavLink === "promo-zone" ? "brightness(0) invert(1)" : "saturate(0)" }}
                /> Promo Zone
              </button>
              <button
                className={`mainNavButton ${selectedMainNavLink === "ask-community" ? "active" : ""}`}
                onClick={() => setSelectedMainNavLink("ask-community")}
              >
                <img
                  src="/images/indeterminate_question_box.svg"
                  alt="Ask the Community"
                  className="icon"
                  style={{ filter: selectedMainNavLink === "ask-community" ? "brightness(0) invert(1)" : "saturate(0)" }}
                /> Ask the Community
              </button>
              <button
                className={`mainNavButton ${selectedMainNavLink === "women-in-business" ? "active" : ""}`}
                onClick={() => setSelectedMainNavLink("women-in-business")}
              >
                <img
                  src="/images/face_4.svg"
                  alt="Women in Business"
                  className="icon"
                  style={{ filter: selectedMainNavLink === "women-in-business" ? "brightness(0) invert(1)" : "saturate(0) brightness(0.5)" }}
                /> Women in Business
              </button>
              <button
                className={`mainNavButton ${selectedMainNavLink === "next-gen-hustle" ? "active" : ""}`}
                onClick={() => setSelectedMainNavLink("next-gen-hustle")}
              >
                <img
                  src="/images/rocket_launch.svg"
                  alt="Next Gen Hustle"
                  className="icon"
                  style={{ filter: selectedMainNavLink === "next-gen-hustle" ? "brightness(0) invert(1)" : "saturate(0)" }}
                /> Next Gen Hustle
              </button>
              <button
                className={`mainNavButton ${selectedMainNavLink === "car-connect" ? "active" : ""}`}
                onClick={() => setSelectedMainNavLink("car-connect")}
              >
                <img
                  src="/images/airport_shuttle.svg"
                  alt="Car Connect"
                  className="icon"
                  style={{ filter: selectedMainNavLink === "car-connect" ? "brightness(0) invert(1)" : "saturate(0)" }}
                /> Car Connect
              </button>
              <button
                className={`mainNavButton ${selectedMainNavLink === "creative-media" ? "active" : ""}`}
                onClick={() => setSelectedMainNavLink("creative-media")}
              >
                <img
                  src="/images/Palette.svg"
                  alt="Creative Media Exchange"
                  className="icon"
                  style={{ filter: selectedMainNavLink === "creative-media" ? "brightness(0) invert(1)" : "saturate(0)" }}
                /> Creative Media Exchange
              </button>
              <button
                className={`mainNavButton ${selectedMainNavLink === "startup-diaries" ? "active" : ""}`}
                onClick={() => setSelectedMainNavLink("startup-diaries")}
              >
                <img
                  src="/images/partner_exchange.svg"
                  alt="Startup Diaries"
                  className="icon"
                  style={{ filter: selectedMainNavLink === "startup-diaries" ? "brightness(0) invert(1)" : "saturate(0)" }}
                /> Startup Diaries
              </button>
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
          </>
        )}

        {/* Coming Soon Pages */}
        {
          sidebarSelected === "home" && (
            <div className="coming-soon">
              <h2>Home</h2>
              <p>Coming Soon</p>
            </div>
          )
        }

        {
          sidebarSelected === "my-communities" && (
            <div className="coming-soon">
              <h2>My Communities</h2>
              <p>Coming Soon</p>
            </div>
          )
        }

        {
          sidebarSelected === "notifications" && (
            <div className="coming-soon">
              <h2>Notifications</h2>
              <p>Coming Soon</p>
            </div>
          )
        }

        {
          sidebarSelected === "messages" && (
            <div className="coming-soon">
              <h2>Messages</h2>
              <p>Coming Soon</p>
            </div>
          )
        }
      </div >
    </div >
  );
};

export default WomenInBusiness;