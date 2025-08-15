"use client";

import { useState, useEffect } from "react";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import { getCommunityPosts, getRecentPosts, Post, RecentPost } from "@utils/__api__/communityMarketPosts";
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

const demoPostsData = [
  {
    id: 1,
    author: "Collins Abdullahi",
    image: "/assets/images/faces/7.png",
    time: "12 Jun • 05:10",
    title: "Implementing Blockchain for Supply Chain Transparency",
    content:
      "After several months of testing, we have successfully integrated blockchain technology into our supply chain management. This has provided unprecedented transparency in tracking goods from source to consumer, significantly reducing fraud and improving customer trust.",
    tags: ["Blockchain & Web3"],
    likes: 21,
    comments: 4, 
    views: 390,
    replies: [
      {
        author: "Omar Al-Farouq",
        image: "/assets/images/faces/2.jpg",
        content:
          "Absolutely fantastic! It's amazing to see how technology keeps improving. Such similar issues in our different industries when it comes to writing code for blockchain and supply chain. Looking forward to reading more about your journey.",
        date: "10 Jun • 14:20",
      },
      {
        author: "Kattia Abdullah",
        image: "/assets/images/faces/3.jpg",
        content:
          "Collins, Great to hear your thoughts! Completely agree, and it's exciting to see how blockchain will continue to revolutionize various industries across the board.",
        date: "17 Jun • 07:10",
      },
      {
        author: "Aamir Muhammad",
        image: "/assets/images/faces/4.jpg",
        content: "How does it work with top event-loop management systems?",
        date: "11 Jun • 09:10",
      },
      {
        author: "Yusuf Saad",
        image: "/assets/images/faces/5.jpg",
        content:
          "Impressive work. I watch blockchain's potential for eliminating transparency in the supply chain as a game-changing. I'm excited to see where this will take the industry moving forward.",
        date: "19 Jun • 05:10",
      },
    ],
  },
  {
    id: 2,
    author: "Jaila Hassan",
    image: "/assets/images/faces/face-2.png",
    time: "11 Jun • 09:10",
    title: "Successfully Secured Khalifa Fund Support for My Startup!",
    content:
      "I'm excited to announce that my startup was just approved for funding by the Khalifa Fund 🎉 The process was incredibly thorough, and we're happy to expand. If anyone else has been through this, I'd love to hear about your experience and any tips for successfully navigating this next phase!",
    tags: ["Funding & Finance"],
    likes: 25,
    comments: 4,
    views: 520,
    replies: [
      {
        author: "Ahmed Al-Rashid",
        image: "/assets/images/faces/2.jpg",
        content: "Congratulations! The Khalifa Fund has been a game changer for many entrepreneurs. Make sure to leverage their mentorship programs as well.",
        date: "11 Jun • 10:30",
      },
      {
        author: "Fatima Al-Zahra",
        image: "/assets/images/faces/3.jpg",
        content: "This is inspiring! I'm currently preparing my application. Any specific tips for the pitch presentation?",
        date: "11 Jun • 15:45",
      },
      {
        author: "Mohammed Khalil",
        image: "/assets/images/faces/4.jpg",
        content: "Well deserved! Your startup concept was always strong. Looking forward to seeing your growth journey.",
        date: "12 Jun • 08:20",
      },
      {
        author: "Sara Abdullah",
        image: "/assets/images/faces/5.jpg",
        content: "Amazing news! The UAE startup ecosystem is thriving with success stories like yours.",
        date: "12 Jun • 14:15",
      },
    ],
  },
  {
    id: 3,
    author: "Ali Khatri",
    image: "/assets/images/faces/face-7.jpg",
    time: "13 Jun • 06:10",
    title: "Implementing Data-Driven Strategies to Boost Business Growth",
    content:
      "As part of our ongoing efforts to scale our business, we've recently implemented a more data-driven approach across all departments. By leveraging analytics to track customer behavior, optimize marketing campaigns, and improve operational efficiency, we've seen a 35% increase in overall performance metrics.",
    tags: ["Growth & Scaling"],
    likes: 31,
    comments: 3,
    views: 780,
    replies: [
      {
        author: "Layla Mansour",
        image: "/assets/images/faces/2.jpg",
        content: "Great insights! Which analytics tools have you found most effective for tracking customer behavior?",
        date: "13 Jun • 09:25",
      },
      {
        author: "Khalid Hassan",
        image: "/assets/images/faces/3.jpg",
        content: "35% improvement is impressive! Would love to hear more about your implementation strategy.",
        date: "13 Jun • 11:40",
      },
      {
        author: "Nour Al-Din",
        image: "/assets/images/faces/4.jpg",
        content: "This aligns perfectly with our current initiatives. Data-driven decisions are indeed game changers.",
        date: "14 Jun • 07:30",
      },
    ],
  },
  {
    id: 4,
    author: "Amira Rashid",
    image: "/assets/images/faces/face-2.png",
    time: "14 Jun • 11:30",
    title: "Launching Our First AI-Powered E-commerce Platform",
    content:
      "After 18 months of development, we're finally launching our AI-powered e-commerce platform that personalizes shopping experiences in real-time. The beta testing showed 40% higher conversion rates compared to traditional platforms. Excited to see how the market responds!",
    tags: ["AI & Machine Learning"],
    likes: 42,
    comments: 6,
    views: 1200,
    replies: [
      {
        author: "Hassan Al-Mahmoud",
        image: "/assets/images/faces/2.jpg",
        content: "Congratulations on the launch! AI personalization is the future of e-commerce. What ML models are you using?",
        date: "14 Jun • 12:15",
      },
      {
        author: "Zara Ibrahim",
        image: "/assets/images/faces/3.jpg",
        content: "40% improvement in conversion rates is phenomenal! Are you planning to open-source any components?",
        date: "14 Jun • 16:20",
      },
      {
        author: "Omar Farid",
        image: "/assets/images/faces/4.jpg",
        content: "This sounds groundbreaking! How are you handling data privacy with the personalization features?",
        date: "15 Jun • 08:45",
      },
      {
        author: "Mariam Al-Zahra",
        image: "/assets/images/faces/5.jpg",
        content: "Impressive work! Would love to beta test this for our retail clients. Is there a waiting list?",
        date: "15 Jun • 10:30",
      },
      {
        author: "Yousef Al-Rashid",
        image: "/assets/images/faces/6.jpg",
        content: "The timing is perfect with the current e-commerce boom. Looking forward to seeing your success metrics!",
        date: "15 Jun • 14:00",
      },
      {
        author: "Lina Kassem",
        image: "/assets/images/faces/7.png",
        content: "As a UX designer, I'm curious about how you balance AI recommendations with user control. Great achievement!",
        date: "16 Jun • 09:10",
      },
    ],
  },
  {
    id: 5,
    author: "Tariq Al-Mansouri",
    image: "/assets/images/faces/face-7.jpg",
    time: "15 Jun • 14:45",
    title: "Sustainable Business Practices: Our Journey to Carbon Neutrality",
    content:
      "We've officially achieved carbon neutrality for our manufacturing operations! This 3-year journey involved transitioning to renewable energy, optimizing our supply chain, and implementing circular economy principles. It's proof that profitability and sustainability can go hand in hand.",
    tags: ["Sustainability"],
    likes: 38,
    comments: 5,
    views: 950,
    replies: [
      {
        author: "Farah Al-Kuwari",
        image: "/assets/images/faces/2.jpg",
        content: "This is incredible! Can you share some specific strategies that had the biggest impact on your carbon footprint?",
        date: "15 Jun • 15:30",
      },
      {
        author: "Saeed Abdullah",
        image: "/assets/images/faces/3.jpg",
        content: "Congratulations! How did you manage the initial costs of transitioning to renewable energy?",
        date: "15 Jun • 17:20",
      },
      {
        author: "Nadia Hassan",
        image: "/assets/images/faces/4.jpg",
        content: "Leading by example! More companies need to follow this path. What's your next sustainability goal?",
        date: "16 Jun • 08:15",
      },
      {
        author: "Rashid Al-Maktoum",
        image: "/assets/images/faces/5.jpg",
        content: "Fantastic achievement! How are you measuring and verifying your carbon neutrality status?",
        date: "16 Jun • 11:45",
      },
      {
        author: "Mona Al-Thani",
        image: "/assets/images/faces/6.jpg",
        content: "This aligns perfectly with the UAE's Net Zero by 2050 initiative. Great contribution to the national goals!",
        date: "16 Jun • 16:30",
      },
    ],
  },
  {
    id: 6,
    author: "Leila Mahmoud",
    image: "/assets/images/faces/face-2.png",
    time: "16 Jun • 09:20",
    title: "Breaking Into International Markets: Lessons from Our Expansion",
    content:
      "Our expansion into the European market has been a rollercoaster! After 6 months, we've learned invaluable lessons about cultural adaptation, regulatory compliance, and local partnerships. Revenue is up 60% but the journey wasn't without challenges.",
    tags: ["International Business"],
    likes: 29,
    comments: 4,
    views: 680,
    replies: [
      {
        author: "Ibrahim Al-Rashid",
        image: "/assets/images/faces/2.jpg",
        content: "60% revenue increase is impressive! What were the biggest regulatory hurdles you faced in Europe?",
        date: "16 Jun • 10:15",
      },
      {
        author: "Yasmin Al-Zahra",
        image: "/assets/images/faces/3.jpg",
        content: "Cultural adaptation is often underestimated. How did you modify your products/services for the European market?",
        date: "16 Jun • 13:40",
      },
      {
        author: "Khaled Mansour",
        image: "/assets/images/faces/4.jpg",
        content: "Local partnerships are crucial for international expansion. How did you identify the right partners?",
        date: "17 Jun • 07:20",
      },
      {
        author: "Rania Kassem",
        image: "/assets/images/faces/5.jpg",
        content: "This gives me hope for our own international expansion plans. Any advice for market research strategies?",
        date: "17 Jun • 12:30",
      },
    ],
  },
  {
    id: 7,
    author: "Ahmed Al-Futtaim",
    image: "/assets/images/faces/face-7.jpg",
    time: "17 Jun • 16:15",
    title: "The Rise of Fintech in the MENA Region: Opportunities and Challenges",
    content:
      "Having worked in traditional banking for 15 years before founding my fintech startup, I've witnessed the incredible transformation of financial services in MENA. Digital payments have grown 300% in the last 2 years alone. However, regulatory frameworks still need to catch up.",
    tags: ["Fintech"],
    likes: 55,
    comments: 8,
    views: 1450,
    replies: [
      {
        author: "Salma Al-Qasimi",
        image: "/assets/images/faces/2.jpg",
        content: "300% growth is staggering! Which countries in the region are leading this fintech revolution?",
        date: "17 Jun • 17:00",
      },
      {
        author: "Basel Mahmoud",
        image: "/assets/images/faces/3.jpg",
        content: "The regulatory gap is a real challenge. Are you seeing any positive movements from central banks in the region?",
        date: "17 Jun • 18:30",
      },
      {
        author: "Dina Al-Rashid",
        image: "/assets/images/faces/4.jpg",
        content: "As someone in traditional banking, this transition must have been eye-opening. What surprised you most about fintech?",
        date: "18 Jun • 08:45",
      },
      {
        author: "Majid Al-Thani",
        image: "/assets/images/faces/5.jpg",
        content: "Digital payments adoption has been incredible indeed. How are you addressing cybersecurity concerns?",
        date: "18 Jun • 10:20",
      },
      {
        author: "Aya Hassan",
        image: "/assets/images/faces/6.jpg",
        content: "What role do you see crypto and blockchain playing in the future of MENA fintech?",
        date: "18 Jun • 14:15",
      },
      {
        author: "Waleed Al-Mansouri",
        image: "/assets/images/faces/7.png",
        content: "The regulatory challenge is universal. How do you balance innovation with compliance requirements?",
        date: "18 Jun • 16:45",
      },
      {
        author: "Hala Al-Zahra",
        image: "/assets/images/faces/2.jpg",
        content: "Financial inclusion is improving dramatically. Are you seeing impact in underbanked communities?",
        date: "19 Jun • 09:30",
      },
      {
        author: "Saif Al-Kuwari",
        image: "/assets/images/faces/3.jpg",
        content: "Cross-border payments are still a pain point. Any innovations you're working on in this space?",
        date: "19 Jun • 11:50",
      },
    ],
  },
];

export default function CommunityLanding() {
  const [activeItem, setActiveItem] = useState("Home");
  const [activeFilter, setActiveFilter] = useState("All Posts");
  const [showReplies, setShowReplies] = useState({});
  const [displayPosts, setDisplayPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<string>("Not authenticated");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [postLikeCounts, setPostLikeCounts] = useState<{postId: number, likeCount: number}[]>([]);

  // Function to load demo posts (API replacement)
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    setAuthStatus("Loading demo data...");
    
    try {
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log("Loading demo posts data...");
      
      // Use demo posts data directly
      setDisplayPosts(demoPostsData);
      
      // Initialize like counts for each post and reset liked posts
      const initialLikeCounts = demoPostsData.map(post => ({
        postId: post.id,
        likeCount: post.likes
      }));
      setPostLikeCounts(initialLikeCounts);
      setLikedPosts([]); // Reset liked posts when loading new data
      
      setAuthStatus("Demo data loaded successfully");
      console.log(`Successfully loaded ${demoPostsData.length} demo posts`);
    } catch (err) {
      console.error("Error loading demo posts:", err);
      setError("Failed to load demo posts. Please try again.");
      setAuthStatus("Demo data loading failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to load recent demo posts
  const fetchRecentPosts = async (limit: number = 5) => {
    setIsLoading(true);
    setError(null);
    setAuthStatus("Loading recent demo data...");
    
    try {
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log(`Loading recent demo posts with limit ${limit}...`);
      
      // Get recent posts from demo data (last N posts)
      const recentDemoPosts = demoPostsData.slice(-limit).reverse(); // Get last N posts and reverse for recent-first order
      
      setDisplayPosts(recentDemoPosts);
      
      // Initialize like counts for each post and reset liked posts
      const initialLikeCounts = recentDemoPosts.map(post => ({
        postId: post.id,
        likeCount: post.likes
      }));
      setPostLikeCounts(initialLikeCounts);
      setLikedPosts([]); // Reset liked posts when loading new data
      
      setAuthStatus("Recent demo data loaded successfully");
      console.log(`Successfully loaded ${recentDemoPosts.length} recent demo posts`);
    } catch (err) {
      console.error("Error loading recent demo posts:", err);
      setError("Failed to load recent demo posts. Please try again.");
      setAuthStatus("Recent demo data loading failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter click for different filter types
  const handleFilterClick = async (filterLabel: string) => {
    setActiveFilter(filterLabel);
    if (filterLabel === "All Posts") {
      await fetchPosts();
    } else if (filterLabel === "Recents") {
      await fetchRecentPosts(5); // Fetch 5 recent posts
    }
    // TODO: Add handlers for "Trending" and "Popular" filters when those APIs are available
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

  const handleLikeToggle = (postId: number) => {
    // Toggle liked state
    setLikedPosts(prev => {
      const isCurrentlyLiked = prev.includes(postId);
      if (isCurrentlyLiked) {
        return prev.filter(id => id !== postId);
      } else {
        return [...prev, postId];
      }
    });

    // Update like count
    setPostLikeCounts(prev => {
      const existingPost = prev.find(p => p.postId === postId);
      const isCurrentlyLiked = likedPosts.includes(postId);
      
      if (existingPost) {
        return prev.map(p => 
          p.postId === postId 
            ? { ...p, likeCount: isCurrentlyLiked ? p.likeCount - 1 : p.likeCount + 1 }
            : p
        );
      } else {
        // Find original like count from displayPosts
        const originalPost = displayPosts.find(p => p.id === postId);
        const originalLikes = originalPost?.likes || 0;
        return [...prev, { postId, likeCount: isCurrentlyLiked ? originalLikes - 1 : originalLikes + 1 }];
      }
    });
  };

  const getCurrentLikeCount = (postId: number) => {
    const postLikeData = postLikeCounts.find(p => p.postId === postId);
    if (postLikeData) {
      return postLikeData.likeCount;
    }
    // Fallback to original like count from displayPosts
    const originalPost = displayPosts.find(p => p.id === postId);
    return originalPost?.likes || 0;
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

            {/* Search */}
            <Box display="flex" alignItems="center" style={{ gap: "1rem" }}>
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
                {authStatus === "Authenticating..." ? "Loading Posts..." : "Loading posts..."}
              </div>
              {/* <div style={{ fontSize: "14px", color: "#9CA3AF" }}>
                {authStatus === "Authenticating..." 
                  ? "Logging in with superadmin credentials..." 
                  : "Fetching community posts from API..."}
              </div> */}
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
                      onClick={() => handleLikeToggle(post.id)}
                    >
                      <ThumbsUp 
                        size={20} 
                        style={{ 
                          color: likedPosts.includes(post.id) ? "#1D4EDF" : "#818C99",
                          fill: likedPosts.includes(post.id) ? "#EFF6FF" : "none"
                        }} 
                      />
                      <span style={{ fontSize: "14px", color: "#818C99" }}>
                        {getCurrentLikeCount(post.id)}
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
