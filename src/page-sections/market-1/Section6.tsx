"use client";

import { useState, useEffect } from "react";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import { getCommunityPosts, Post } from "@utils/__api__/communityMarketPosts";
import { isAuthenticated, getCurrentUser } from "@utils/__api__/auth";
import {
  Home,
  Compass,
  Users,
  Bell,
  MessageCircle,
  MessageSquare,
  Search,
  TrendingUp,
  Clock,
  Star,
  ThumbsUp,
  Eye,
  MoreHorizontal,
  ChevronDown,
  ShareIcon,
  Share2,
  Camera,
  Smile,
  Paperclip,
  Send,
} from "lucide-react";

// const hardcodedPosts = [
//   {
//     id: 1,
//     author: "Collins Abdullahi",
//     image: "/assets/images/faces/7.png",
//     time: "12 Jun • 05:10",
//     title: "Implementing Blockchain for Supply Chain Transparency",
//     content:
//       "After several months of testing, we have successfully integrated blockchain technology into our supply chain management. This has provided unprecedented transparency in tracking goods from source to consumer, significantly reducing fraud and improving customer trust.",
//     tags: ["Blockchain & Web3"],
//     likes: 21,
//     comments: 4, 
//     views: 390,
//     replies: [
//       {
//         author: "Omar Al-Farouq",
//         image: "/assets/images/faces/2.jpg",
//         content:
//           "Absolutely fantastic! It's amazing to see how technology keeps improving. Such similar issues in our different industries when it comes to writing code for blockchain and supply chain. Looking forward to reading more about your journey.",
//         date: "10 Jun • 14:20",
//       },
//       {
//         author: "Kattia Abdullah",
//         image: "/assets/images/faces/3.jpg",
//         content:
//           "Collins, Great to hear your thoughts! Completely agree, and it's exciting to see how blockchain will continue to revolutionize various industries across the board.",
//         date: "17 Jun • 07:10",
//       },
//       {
//         author: "Aamir Muhammad",
//         image: "/assets/images/faces/4.jpg",
//         content: "How does it work with top event-loop management systems?",
//         date: "11 Jun • 09:10",
//       },
//       {
//         author: "Yusuf Saad",
//         image: "/assets/images/faces/5.jpg",
//         content:
//           "Impressive work. I watch blockchain's potential for eliminating transparency in the supply chain as a game-changing. I'm excited to see where this will take the industry moving forward.",
//         date: "19 Jun • 05:10",
//       },
//     ],
//   },
//   {
//     id: 2,
//     author: "Jaila Hassan",
//     image: "/assets/images/faces/face-2.png",
//     time: "11 Jun • 09:10",
//     title: "Successfully Secured Khalifa Fund Support for My Startup!",
//     content:
//       "I'm excited to announce that my startup was just approved for funding by the Khalifa Fund 🎉 The process was incredibly thorough, and we're happy to expand. If anyone else has been through this, I'd love to hear about your experience and any tips for successfully navigating this next phase!",
//     tags: ["Funding & Finance"],
//     likes: 25,
//     comments: 4,
//     views: 520,
//   },
//   {
//     id: 3,
//     author: "Ali Khatri",
//     image: "/assets/images/faces/face-7.jpg",
//     time: "13 Jun • 06:10",
//     title: "Implementing Data-Driven Strategies to Boost Business Growth",
//     content:
//       "As part of our ongoing efforts to scale our business, we've recently implemented a more data-driven approach across all departments. By leveraging analytics to track customer behavior, optimize marketing campaigns, and improve operational efficiency, we've seen a 35% increase in overall performance metrics.",
//     tags: ["Growth & Scaling"],
//     likes: 31,
//     comments: 3,
//     shares: 5,
//     views: 780,
//   },
// ];

export default function Section6() {
  const [activeItem, setActiveItem] = useState("Home");
  const [activeFilter, setActiveFilter] = useState("All Posts");
  const [showReplies, setShowReplies] = useState({});
  const [displayPosts, setDisplayPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<string>("Not authenticated");

  // Function to fetch posts from API
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    setAuthStatus("Authenticating...");
    
    try {
      console.log("Starting authentication and post fetch process...");
      const apiPosts = await getCommunityPosts();
      
      // Update auth status after successful authentication
      if (isAuthenticated()) {
        const user = getCurrentUser();
        setAuthStatus(`Authenticated as: ${user?.identifier || 'Unknown'}`);
      }
      
      // Transform API posts to match the display format
      const transformedPosts = apiPosts.map((post) => ({
        id: parseInt(post.id),
        author: `User ${post.author.id}`, // Since we only have author ID
        image: "/assets/images/faces/7.png", // Default image since API doesn't provide
        time: new Date(post.createdAt).toLocaleDateString(),
        title: post.title,
        content: post.content,
        tags: [post.tag],
        likes: Math.floor(Math.random() * 50) + 1, // Random likes since not in API
        comments: post.comments.length,
        views: post.views,
        replies: post.comments.map((comment) => ({
          author: `User ${comment.author.id}`,
          image: "/assets/images/faces/2.jpg",
          content: comment.text,
          date: new Date(comment.createdAt).toLocaleDateString(),
        })),
      }));
      
      setDisplayPosts(transformedPosts);
      console.log(`Successfully loaded ${transformedPosts.length} posts`);
    } catch (err) {
      console.error("Error in fetchPosts:", err);
      setError(err instanceof Error ? err.message : "Failed to load posts. Please try again.");
      setAuthStatus("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter click, especially for "All Posts"
  const handleFilterClick = async (filterLabel: string) => {
    setActiveFilter(filterLabel);
    if (filterLabel === "All Posts") {
      await fetchPosts();
    }
  };

  // Manual authentication function for testing
  const handleManualAuth = async () => {
    setIsLoading(true);
    setError(null);
    setAuthStatus("Authenticating...");
    
    try {
      const { authService } = await import("@utils/__api__/auth");
      await authService.login();
      
      const user = getCurrentUser();
      setAuthStatus(`Authenticated as: ${user?.identifier || 'Unknown'}`);
      console.log("Manual authentication successful");
    } catch (err) {
      console.error("Manual authentication failed:", err);
      setError(err instanceof Error ? err.message : "Authentication failed");
      setAuthStatus("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically authenticate and fetch posts on component mount
  useEffect(() => {
    const initializeComponent = async () => {
      // Check current auth status
      if (isAuthenticated()) {
        const user = getCurrentUser();
        setAuthStatus(`Authenticated as: ${user?.identifier || 'Unknown'}`);
      } else {
        setAuthStatus("Not authenticated");
      }
      
      // Automatically fetch posts (which will authenticate if needed)
      console.log("Component mounted - automatically fetching posts");
      await fetchPosts();
    };
    
    initializeComponent();
  }, []);

  const navItems = [
    { label: "Home", icon: "/assets/images/icons/home.svg" },
    { label: "Explore", icon: "/assets/images/icons/explore.svg" },
    { label: "My Communities", icon: "/assets/images/icons/groups_2.svg" },
    {
      label: "Notifications",
      icon: "/assets/images/icons/notifications_unread.svg",
    },
    { label: "Messages", icon: "/assets/images/icons/inbox.svg" },
  ];

  const filters = [
    { label: "All Posts", icon: <MessageSquare size={16} /> },
    { label: "Trending", icon: <TrendingUp size={16} /> },
    { label: "Recents", icon: <Clock size={16} /> },
    { label: "Popular", icon: <Star size={16} /> },
  ];

  const toggleReplies = (postId) => {
    setShowReplies((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <Container mb="4.5rem" >
      <FlexBox alignItems="flex-start">
        {/* Sidebar */}
        <Hidden down={768} mr="1.75rem" ml="-4rem">
          <Box
            borderRight="1px solid #E2E8F0"
            marginRight={146}
            padding="1.25rem"
            bg="white"
            width="240px"
          >
            <nav
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {navItems.map((item) => {
                const isActive = activeItem === item.label;

                return (
                  // sidebar navigation box
                  <Box
                    key={item.label}
                    display="flex"
                    alignItems="center"
                    flexDirection="row"
                    padding="10px"
                    borderRadius="16px"
                    onClick={() => setActiveItem(item.label)}
                    style={{
                      backgroundColor: isActive ? "#0030E3" : "transparent",
                      cursor: "pointer",
                      gap: "12px",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={`${item.label} icon`}
                      height="24px"
                      style={{
                        filter: isActive
                          ? "brightness(0) invert(1)" // makes it white
                          : "brightness(0)", // gray/dark
                        transition: "filter 0.2s ease",
                      }}
                    />

                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "white" : "#6E6E6E",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.label}
                    </span>
                  </Box>
                );
              })}
            </nav>
          </Box>
        </Hidden>

        {/* Main Content */}
        <Box flex="1 1 0" minWidth="0px">

          {/* Banner Image */}
          <Box
            position="relative"
            overflow="hidden"
            width="100%"
            height="250px"
          >
            <img
              src="/images/image-65.png"
              alt="Welcome to EJP Community"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              
              }}
            />

            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              padding="30px"
              style={{
                background: "#244EB2CC",
              }}
            />

            <Box
              position="absolute"
              top="50%"
              left="5%"
              color="white"
              textAlign="left"
              style={{ transform: "translateY(-50%)" }}
            >
              <h1 style={{ fontSize: 40, fontWeight: 500, marginBottom: 8 }}>
                Welcome to the{" "}
                <span style={{ color: "#85B6FF" }}>
                  EJP <br /> Community
                </span>
              </h1>
              <p style={{ fontSize: 16, lineHeight: "1.5" }}>
                Join a dynamic ecosystem of businesses and service providers—share insights, discover opportunities, and build meaningful connections across sectors.
              </p>
            </Box>
          </Box>

       
             {/* Area surrounding the all posts, trending, recent, popular */}
          <Box
            display="flex"
            justifyContent="space-between"
            marginTop="2rem"
            alignItems="center"
            flexWrap="wrap"
            style={{ gap: "1rem", padding: "1rem 0" }}
          >
            {/* Filter Buttons */}
            <Box display="flex" style={{ gap: "1rem", flexWrap: "wrap" }}>
              {filters.map((filter) => (
                <button
                  key={filter.label}
                  onClick={() => handleFilterClick(filter.label)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    border: "1px solid",
                    borderColor:
                      activeFilter === filter.label ? "#0030E3" : "#D1D5DB",
                    backgroundColor:
                      activeFilter === filter.label ? "#0030E3" : "#FFFFFF",
                    color:
                      activeFilter === filter.label ? "#FFFFFF" : "#374151",
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                >
                  {filter.icon}
                  {filter.label}
                </button>
              ))}
            </Box>

            {/* Search and Auth Status */}
            <Box display="flex" alignItems="center" style={{ gap: "1rem" }}>
              {/* Authentication Status and Login Button */}
              <Box display="flex" alignItems="center" style={{ gap: "0.5rem" }}>
                <Box
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "500",
                    backgroundColor: isAuthenticated() ? "#ECFDF5" : "#FEF2F2",
                    color: isAuthenticated() ? "#059669" : "#DC2626",
                    border: `1px solid ${isAuthenticated() ? "#D1FAE5" : "#FECACA"}`,
                    minWidth: "160px",
                    textAlign: "center",
                  }}
                >
                  {authStatus}
                </Box>
                
                {/* Manual Login Button (for testing) */}
                {!isAuthenticated() && !isLoading && (
                  <button
                    onClick={handleManualAuth}
                    style={{
                      padding: "8px 12px",
                      fontSize: "12px",
                      fontWeight: "500",
                      backgroundColor: "#3B82F6",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#2563EB";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#3B82F6";
                    }}
                  >
                    Login
                  </button>
                )}
              </Box>
              
              {/* Search */}
              <Box position="relative" width="240px">
                <input
                  type="text"
                  placeholder="Search"
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "14px",
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    outline: "none",
                    alignItems: "flex-end",
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Loading State */}
          {isLoading && (
            <Box textAlign="center" p="2rem">
              <div style={{ fontSize: "16px", color: "#6B7280", marginBottom: "0.5rem" }}>
                {authStatus === "Authenticating..." ? "Authenticating user..." : "Loading posts..."}
              </div>
              <div style={{ fontSize: "14px", color: "#9CA3AF" }}>
                {authStatus === "Authenticating..." 
                  ? "Logging in with superadmin credentials..." 
                  : "Fetching community posts from API..."}
              </div>
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Box
              textAlign="center"
              p="2rem"
              style={{
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "8px",
                color: "#DC2626",
              }}
            >
              {error}
            </Box>
          )}

          {/* Posts Feed */}
          {!isLoading && !error && (
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              {displayPosts.map((post) => (
              <Box
                key={post.id}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  padding: "1.5rem",
                }}
              >
                {/* Post Header, author profile pic, name and time */}
                <FlexBox
                  alignItems="center"
                  justifyContent="space-between"
                  mb="1rem"
                >
                  <FlexBox
                    alignItems="center"
                    justifyContent="space-between"
                    mb="1rem"
                  >
                    <FlexBox alignItems="center" style={{ gap: "12px" }}>
                      <img
                        src={post.image} 
                        alt={post.author}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <Box>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#2A5885",
                          }}
                        >
                          {post.author}
                        </div>
                        <div style={{ fontSize: "12px", color: "#818C99" }}>
                          {post.time}
                        </div>
                      </Box>
                    </FlexBox>
                  </FlexBox>
                </FlexBox>

                {/* Post Content */}
                <Box mb="1rem">
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "0.5rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#374151",
                      lineHeight: "1.6",
                      margin: 0,
                    }}
                  >
                    {post.content}
                  </p>
                </Box>

                {/* Tags */}
                {post.tags && (
                  <FlexBox
                    mb="1rem"
                    style={{ gap: "0.5rem", flexWrap: "wrap" }}
                  >
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "#EFF6FF",
                          color: "#1D4EDF",
                          padding: "4px 12px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </FlexBox>
                )}

                {/* Post Actions */}
                <FlexBox
                  alignItems="center"
                  justifyContent="space-between"
                  pt="1rem"
                  // style={{ borderTop: "1px solid #F3F4F6" }}
                >
                  <FlexBox alignItems="center" style={{ gap: "1.5rem" }}>
                    <FlexBox
                      alignItems="center"
                      style={{ gap: "6px", cursor: "pointer" }}
                    >
                      <ThumbsUp size={20} style={{ color: "#818C99" }} />
                      <span style={{ fontSize: "14px", color: "#818C99" }}>
                        {post.likes}
                      </span>
                    </FlexBox>
                    <FlexBox
                      alignItems="center"
                      style={{ gap: "6px", cursor: "pointer" }}
                      onClick={() => toggleReplies(post.id)}
                    >
                      <img
                        src="/assets/images/icons/messages square_24.svg"
                        alt="share icon"
                        height="24px"
                      />
                      <span style={{ fontSize: "14px", color: "#818C99" }}>
                        {post.comments}
                      </span>
                    </FlexBox>
                    <FlexBox
                      alignItems="center"
                      style={{ gap: "6px", cursor: "pointer" }}
                    >
                      <img
                        src="/assets/images/icons/share_24.svg"
                        alt="share icon"
                        height="24px"
                      />
                      <span style={{ fontSize: "14px", color: "#818C99" }}>
                        {post.shares}
                      </span>
                    </FlexBox>
                  </FlexBox>
                  <FlexBox alignItems="center" style={{ gap: "6px" }}>
                    <Eye size={16} style={{ color: "#818C99" }} />
                    <span style={{ fontSize: "14px", color: "#818C99" }}>
                      {post.views}
                    </span>
                  </FlexBox>
                </FlexBox>

                {/* Replies Section */}
                {post.replies && showReplies[post.id] && (
                  <Box
                    mt="1rem"
                    pt="1rem"
                    style={{ borderTop: "1px solid #F3F4F6" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: "1rem",
                        color: "#2A5885",
                      }}
                    >
                      View replies
                      <img
                        src="/assets/images/icons/chevron-down.svg"
                        alt="chevron icon"
                        height="24px"
                        style={{
                          filter:
                            "invert(30%) sepia(63%) saturate(621%) hue-rotate(176deg) brightness(92%) contrast(91%)",
                        }}
                      />
                    </div>

                    {post.replies.map((reply, index) => (
                      <Box
                        key={index}
                        mb="1rem"
                        p="0.75rem"
                        style={{
                          borderBottom: "1px solid #F3F4F6",
                          // borderLeft: "3px solid #3B82F6"
                        }}
                      >
                        <FlexBox
                          alignItems="center"
                          mb="0.5rem"
                          style={{ gap: "8px" }}
                        >
                          <img
                            src={reply.image}
                            alt={reply.author}
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#2A5885",
                            }}
                          >
                            {reply.author}
                          </span>
                        </FlexBox>

                        <Box style={{ paddingLeft: "32px" }}>
                          {/* Reply Text */}
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#4B5563",
                              lineHeight: "1.5",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {reply.content}
                          </p>

                          {/* Date + Like/Comment */}
                          <FlexBox
                            justifyContent="space-between"
                            alignItems="center"
                            style={{ fontSize: "12px", color: "#818C99" }}
                          >
                            {/* Left: Static or dynamic date */}
                            <span>{reply.date || "Jul 22"}</span>

                            {/* Right: Action Icons */}
                            <FlexBox
                              alignItems="center"
                              style={{ gap: "1rem" }}
                            >
                              <FlexBox
                                alignItems="center"
                                style={{ gap: "4px", cursor: "pointer" }}
                              >
                                <ThumbsUp
                                  size={14}
                                  style={{ color: "#818C99" }}
                                />
                                <span>2</span>
                              </FlexBox>
                              <FlexBox
                                alignItems="center"
                                style={{ gap: "4px", cursor: "pointer" }}
                              >
                                <MessageSquare
                                  size={14}
                                  style={{ color: "#818C99" }}
                                />
                                <span>1</span>
                              </FlexBox>
                            </FlexBox>
                          </FlexBox>
                        </Box>
                      </Box>
                    ))}

                    {/* Reply Input */}
                    <Box mt="1rem" pl="32px">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          width: "100%",
                        }}
                      >
                        {/* Input with embedded right icons */}
                        <div style={{ position: "relative", flex: 1 }}>
                          <input
                            type="text"
                            placeholder="Write a reply..."
                            style={{
                              width: "100%",
                              padding: "10px 100px 10px 12px", // space for icons on the right
                              fontSize: "14px",
                              border: "1px solid #D1D5DB",
                              borderRadius: "6px",
                              outline: "none",
                              backgroundColor: "white",
                            }}
                          />

                          {/* Right icons inside input */}
                          <div
                            style={{
                              position: "absolute",
                              right: "12px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            <Paperclip size={18} color="#6B7280" />
                            <Camera size={18} color="#6B7280" />
                            <Smile size={18} color="#6B7280" />
                          </div>
                        </div>

                        {/* Send icon outside input */}
                        <div
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "38px",
                            width: "38px",
                            borderRadius: "50%",
                            // backgroundColor: "#2563EB",
                          }}
                        >
                          <img
                            src="assets/images/icons/send.svg"
                            style={{
                              height: "24",
                              width: "24",
                            }}
                          />
                        </div>
                      </div>
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
            </Box>
          )}
        </Box>
      </FlexBox>
    </Container>
  );
}
