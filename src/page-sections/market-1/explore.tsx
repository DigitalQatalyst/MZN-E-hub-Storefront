"use client";

import Box from "@component/Box";
import { useCallback, useEffect, useRef, useState } from "react";
import "./explore.css";
import StyledProductCategory from "./styled";

// Types for better type safety
interface SidebarItem {
  id: string;
  label: string;
  icon: JSX.Element;
}

interface NavLink {
  id: string;
  label: string;
  icon: string;
}

interface CommunityCard {
  id: string;
  title: string;
  members: string;
  description: string;
  avatar: string;
}

interface MainNavLink {
  id: string;
  label: string;
  icon: string;
}

const Explore = () => {
  const [sidebarSelected, setSidebarSelected] = useState("explore");
  const [selectedNavLink, setSelectedNavLink] = useState("trending");
  const [selectedMainNavLink, setSelectedMainNavLink] = useState("women-in-business");
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainNavRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  // Memoized handlers for better performance
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const handleScroll = useCallback(() => {
    if (mainNavRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = mainNavRef.current;
      const isScrolled = scrollLeft > 0;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;

      mainNavRef.current.classList.toggle("scrolled", isScrolled);
      mainNavRef.current.classList.toggle("at-end", isAtEnd);
    }

    if (navLinksRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navLinksRef.current;
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1;
      navLinksRef.current.classList.toggle("at-end", isAtEnd);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (
      mainNavRef.current &&
      (e.key === "ArrowLeft" || e.key === "ArrowRight")
    ) {
      e.preventDefault();
      const scrollAmount = 200;
      const currentScroll = mainNavRef.current.scrollLeft;

      if (e.key === "ArrowLeft") {
        mainNavRef.current.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: "smooth",
        });
      } else if (e.key === "ArrowRight") {
        mainNavRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (mainNavRef.current) {
      e.preventDefault();
      mainNavRef.current.scrollLeft += e.deltaY;
    }
  }, []);

  // Handle responsive behavior and scroll indicators
  useEffect(() => {
    // Initial setup
    handleResize();
    window.addEventListener("resize", handleResize);

    const mainNavElement = mainNavRef.current;
    const navLinksElement = navLinksRef.current;

    if (mainNavElement) {
      mainNavElement.addEventListener("scroll", handleScroll);
      mainNavElement.addEventListener("keydown", handleKeyDown);
      mainNavElement.addEventListener("wheel", handleWheel);
      mainNavElement.setAttribute("tabindex", "0");
    }

    if (navLinksElement) {
      navLinksElement.addEventListener("scroll", handleScroll);
    }

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mainNavElement) {
        mainNavElement.removeEventListener("scroll", handleScroll);
        mainNavElement.removeEventListener("keydown", handleKeyDown);
        mainNavElement.removeEventListener("wheel", handleWheel);
      }
      if (navLinksElement) {
        navLinksElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleResize, handleScroll, handleKeyDown, handleWheel]);

  // Data for sidebar items
  const sidebarItems: SidebarItem[] = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: "explore",
      label: "Explore",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M7.80039 16.1984L14.4004 14.3984L16.2004 7.79844L9.60039 9.59844L7.80039 16.1984ZM12.0004 13.1984C11.6671 13.2151 11.3837 13.1044 11.1504 12.8662C10.9171 12.628 10.8004 12.3388 10.8004 11.9984C10.8004 11.6651 10.9171 11.3818 11.1504 11.1484C11.3837 10.9151 11.6671 10.7984 12.0004 10.7984C12.3337 10.7984 12.6171 10.9151 12.8504 11.1484C13.0837 11.3818 13.2004 11.6651 13.2004 11.9984C13.2004 12.3318 13.0837 12.6151 12.8504 12.8484C12.6171 13.0818 12.3337 13.1984 12.0004 13.1984ZM12.0074 21.5984C10.6861 21.5984 9.44206 21.3484 8.27539 20.8484C7.10872 20.3484 6.08789 19.6609 5.21289 18.7859C4.33789 17.9109 3.65039 16.8904 3.15039 15.7244C2.65039 14.5584 2.40039 13.3126 2.40039 11.9869C2.40039 10.6613 2.65039 9.41927 3.15039 8.26094C3.65039 7.1026 4.33789 6.08594 5.21289 5.21094C6.08789 4.33594 7.10839 3.64844 8.27439 3.14844C9.44039 2.64844 10.6862 2.39844 12.0119 2.39844C13.3376 2.39844 14.5796 2.64844 15.7379 3.14844C16.8962 3.64844 17.9129 4.33594 18.7879 5.21094C19.6629 6.08594 20.3504 7.10444 20.8504 8.26644C21.3504 9.4286 21.6004 10.6703 21.6004 11.9914C21.6004 13.3128 21.3504 14.5568 20.8504 15.7234C20.3504 16.8901 19.6629 17.9109 18.7879 18.7859C17.9129 19.6609 16.8944 20.3484 15.7324 20.8484C14.5702 21.3484 13.3286 21.5984 12.0074 21.5984Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: "my-communities",
      label: "My Communities",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M16 4C16 6.21 14.21 8 12 8C9.79 8 8 6.21 8 4C8 1.79 9.79 0 12 0C14.21 0 16 1.79 16 4ZM4 4C4 5.1 4.9 6 6 6C7.1 6 8 5.1 8 4C8 2.9 7.1 2 6 2C4.9 2 4 2.9 4 4ZM18 10.2C18.6 10.7 19 11.4 19 12.2V16H15V12C15 11.4 14.9 10.8 14.7 10.3C15.9 10.1 17 10.1 18 10.2ZM12 10C15.3 10 18 11.3 18 13V16H6V13C6 11.3 8.7 10 12 10ZM6 10C6.7 10 7.4 10.1 8 10.2C7.2 10.9 6.7 11.9 6.7 13V16H1V12.2C1 11.4 1.4 10.7 2 10.2C3 10.1 4.1 10.1 5.3 10.3C5.1 10.8 5 11.4 5 12V16H6V10Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M10 2C6.69 2 4 4.69 4 8V12L2 14V15H18V14L16 12V8C16 4.69 13.31 2 10 2ZM10 20C11.1 20 12 19.1 12 18H8C8 19.1 8.9 20 10 20Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M2 2H18C19.1 2 20 2.9 20 4V16C20 17.1 19.1 18 18 18H2C0.9 18 0 17.1 0 16V4C0 2.9 0.9 2 2 2ZM2 6V16H18V6L10 11L2 6ZM2 4L10 9L18 4H2Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  // Data for navigation links
  const navLinks: NavLink[] = [
    { id: "trending", label: "Trending", icon: "/images/trending-up.svg" },
    { id: "recently-added", label: "Recently Added", icon: "/images/clock.svg" },
    { id: "popular", label: "Popular", icon: "/images/star2.svg" },
  ];

  // Data for main navigation
  const mainNavLinks: MainNavLink[] = [
    { id: "promo-zone", label: "Promo Zone", icon: "/images/brand_awareness.svg" },
    { id: "ask-community", label: "Ask the Community", icon: "/images/indeterminate_question_box.svg" },
    { id: "women-in-business", label: "Women in Business", icon: "/images/face_4.svg" },
    { id: "next-gen-hustle", label: "Next Gen Hustle", icon: "/images/rocket_launch.svg" },
    { id: "car-connect", label: "Car Connect", icon: "/images/airport_shuttle.svg" },
    { id: "creative-media", label: "Creative Media Exchange", icon: "/images/Palette.svg" },
    { id: "startup-diaries", label: "Startup Diaries", icon: "/images/partner_exchange.svg" },
  ];

  // Sample community data
  const featuredCommunities: CommunityCard[] = [
    {
      id: "1",
      title: "Women in Business AbuDhabi",
      members: "10k+ Members",
      description: "A community focused on empowering women entrepreneurs, offering resources, networking, and support for business growth and leadership in...",
      avatar: "/images/avatar.png",
    },
    {
      id: "2",
      title: "Women in Technology & Innovation",
      members: "10k+ Members",
      description: "A network for women leading the charge in technology and innovation, driving digital transformation and fostering tech entrepreneurship.",
      avatar: "/images/avatar.png",
    },
    {
      id: "3",
      title: "Women in Finance & Investment",
      members: "10k+ Members",
      description: "A community dedicated to women in finance, providing resources, mentorship, and networking opportunities for investment professionals and entrepreneurs.",
      avatar: "/images/avatar.png",
    },
    {
      id: "4",
      title: "Women in Retail & E-Commerce",
      members: "10k+ Members",
      description: "A community for female entrepreneurs in retail and e-commerce, sharing strategies for business growth, digital marketing, and consumer engagement in the UAE.",
      avatar: "/images/avatar.png",
    },
  ];

  const innovatorsCommunities: CommunityCard[] = [
    {
      id: "5",
      title: "Female Founders in Fintech",
      members: "10k+ Members",
      description: "A hub for women revolutionizing the financial services industry through fintech solutions, offering insights into investment strategies and tech...",
      avatar: "/images/avatar.png",
    },
    {
      id: "6",
      title: "AI & Machine Learning Innovators",
      members: "10k+ Members",
      description: "A community dedicated to women developing cutting-edge AI and machine learning technologies, creating solutions across industries like healthcare...",
      avatar: "/images/avatar.png",
    },
    {
      id: "7",
      title: "EdTech Founders Network",
      members: "10k+ Members",
      description: "For women in the education technology space, sharing ideas, solutions, and strategies for improving learning through innovation and technology.",
      avatar: "/images/avatar.png",
    },
    {
      id: "8",
      title: "Social Impact Entrepreneurs",
      members: "10k+ Members",
      description: "A community for women who are combining business with social impact, striving to address pressing societal challenges while building profitable...",
      avatar: "/images/avatar.png",
    },
  ];

  // Component for sidebar items
  const SidebarItem = ({ item }: { item: SidebarItem }) => (
    <StyledProductCategory key={item.id}>
      <Box
        display="flex"
        alignItems="center"
        padding="12px"
        borderRadius="8px"
        width="100%"
        maxWidth="280px"
        style={{
          cursor: "pointer",
          background: sidebarSelected === item.id ? "#0030E3" : "transparent",
          color: sidebarSelected === item.id ? "white" : "#6C757D",
        }}
        onClick={() => setSidebarSelected(item.id)}
      >
        <Box
          width={24}
          height={24}
          marginRight={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            color: sidebarSelected === item.id ? "white" : "#6C757D",
          }}
        >
          {item.icon}
        </Box>
        <span
          style={{
            fontSize: "14px",
            fontWeight: sidebarSelected === item.id ? 600 : 400,
          }}
        >
          {item.label}
        </span>
      </Box>
    </StyledProductCategory>
  );

  // Component for community cards
  const CommunityCardComponent = ({ community }: { community: CommunityCard }) => (
    <div className="communityCard" key={community.id}>
      <div className="cardHeader">
        <img
          src={community.avatar}
          alt={`${community.title} Avatar`}
          className="avatar"
        />
        <div className="cardInfo">
          <h3 className="cardTitle">{community.title}</h3>
          <p className="cardMembers">{community.members}</p>
        </div>
        <button className="joinButton" aria-label={`Join ${community.title}`}>
          Join
        </button>
      </div>
      <p className="cardDescription">{community.description}</p>
    </div>
  );

  // Component for navigation buttons
  const NavButton = ({ link, isActive, onClick }: {
    link: NavLink;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      className={`navButton ${isActive ? "active-nav-link" : ""}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <img
        src={link.icon}
        alt={`${link.label} Icon`}
        className="navIcon"
        style={{
          filter: isActive ? "brightness(0) invert(1)" : "none",
        }}
      />
      {link.label}
    </button>
  );

  // Component for main navigation buttons
  const MainNavButton = ({ link, isActive, onClick }: {
    link: MainNavLink;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      className={`mainNavButton ${isActive ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <img
        src={link.icon}
        alt={link.label}
        className="icon"
        style={{
          filter: isActive
            ? "brightness(0) invert(1)"
            : "saturate(0)",
        }}
      />
      {link.label}
    </button>
  );

  // Component for coming soon pages
  const ComingSoon = ({ title }: { title: string }) => (
    <div className="coming-soon">
      <h2>{title}</h2>
      <p>Coming Soon</p>
    </div>
  );

  return (
    <div className="container">
      {/* Sidebar */}
      <Box
        borderRight="1px solid var(--Gray-20, #E2E8F0)"
        padding="1.25rem"
        bg="white"
        className="sidebar"
        style={{
          minWidth: isMobile ? "auto" : "280px",
          width: isMobile ? "100%" : "280px",
        }}
      >
        {sidebarItems.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </Box>

      {/* Main Content */}
      <div className="main-content-wrapper">
        {sidebarSelected === "explore" && (
          <>
            <div className="topNav">
              <div className="navLinks" ref={navLinksRef}>
                {navLinks.map((link) => (
                  <NavButton
                    key={link.id}
                    link={link}
                    isActive={selectedNavLink === link.id}
                    onClick={() => setSelectedNavLink(link.id)}
                  />
                ))}
              </div>
              <input
                type="text"
                placeholder="Search communities..."
                className="searchBar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search communities"
              />
            </div>

            <div className="mainNav" ref={mainNavRef}>
              {mainNavLinks.map((link) => (
                <MainNavButton
                  key={link.id}
                  link={link}
                  isActive={selectedMainNavLink === link.id}
                  onClick={() => setSelectedMainNavLink(link.id)}
                />
              ))}
            </div>

            <div className="header">
              <h1 className="title">Women in Business</h1>
              <button className="followSpaceButton">Follow Space</button>
            </div>

            <p className="description">
              Support, visibility, and resources for female entrepreneurs in the
              UAE to thrive in their ventures, connect with like-minded
              innovators, access expert mentorship and funding opportunities,
              and build sustainable businesses that contribute meaningfully to
              the region's economic growth.
            </p>

            <h2 className="sectionTitle">
              Featured Women in Business Communities
            </h2>
            <div className="communityGrid">
              {featuredCommunities.map((community) => (
                <CommunityCardComponent key={community.id} community={community} />
              ))}
            </div>
            <button className="showMoreButton">Show more</button>

            <h2 className="sectionTitle">Women Innovators & Founders</h2>
            <div className="communityGrid">
              {innovatorsCommunities.map((community) => (
                <CommunityCardComponent key={community.id} community={community} />
              ))}
            </div>
            <button className="showMoreButton">Show more</button>
          </>
        )}

        {/* Coming Soon Pages */}
        {sidebarSelected === "home" && <ComingSoon title="Home" />}
        {sidebarSelected === "my-communities" && <ComingSoon title="My Communities" />}
        {sidebarSelected === "notifications" && <ComingSoon title="Notifications" />}
        {sidebarSelected === "messages" && <ComingSoon title="Messages" />}
      </div>
    </div>
  );
};

export default Explore;