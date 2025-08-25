"use client";

import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { H1 } from "@component/Typography";
import CommunityGrid from "./CommunityGrid";
import MainNavigation from "./MainNavigation";
import TopNavigation from "./TopNavigation";
import { CommunityCard } from "./types";

// Sample community data
const featuredCommunities: CommunityCard[] = [
  {
    id: "1",
    title: "Women in Business AbuDhabi",
    members: "10k+ Members",
    description:
      "A community focused on empowering women entrepreneurs, offering resources, networking, and support for business growth and leadership in...",
    avatar: "/images/avatar.png",
  },
  {
    id: "2",
    title: "Women in Technology & Innovation",
    members: "10k+ Members",
    description:
      "A network for women leading the charge in technology and innovation, driving digital transformation and fostering tech entrepreneurship.",
    avatar: "/images/avatar.png",
  },
  {
    id: "3",
    title: "Women in Finance & Investment",
    members: "10k+ Members",
    description:
      "A community dedicated to women in finance, providing resources, mentorship, and networking opportunities for investment professionals and entrepreneurs.",
    avatar: "/images/avatar.png",
  },
  {
    id: "4",
    title: "Women in Retail & E-Commerce",
    members: "10k+ Members",
    description:
      "A community for female entrepreneurs in retail and e-commerce, sharing strategies for business growth, digital marketing, and consumer engagement in the UAE.",
    avatar: "/images/avatar.png",
  },
];

const innovatorsCommunities: CommunityCard[] = [
  {
    id: "5",
    title: "Female Founders in Fintech",
    members: "10k+ Members",
    description:
      "A hub for women revolutionizing the financial services industry through fintech solutions, offering insights into investment strategies and tech...",
    avatar: "/images/avatar.png",
  },
  {
    id: "6",
    title: "AI & Machine Learning Innovators",
    members: "10k+ Members",
    description:
      "A community dedicated to women developing cutting-edge AI and machine learning technologies, creating solutions across industries like healthcare...",
    avatar: "/images/avatar.png",
  },
  {
    id: "7",
    title: "EdTech Founders Network",
    members: "10k+ Members",
    description:
      "For women in the education technology space, sharing ideas, solutions, and strategies for improving learning through innovation and technology.",
    avatar: "/images/avatar.png",
  },
  {
    id: "8",
    title: "Social Impact Entrepreneurs",
    members: "10k+ Members",
    description:
      "A community for women who are combining business with social impact, striving to address pressing societal challenges while building profitable...",
    avatar: "/images/avatar.png",
  },
];

interface ExploreContentProps {
  selectedNavLink: string;
  onNavLinkChange: (link: string) => void;
  selectedMainNavLink: string;
  onMainNavLinkChange: (link: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onJoinCommunity?: (id: string) => void;
}

const ExploreContent: React.FC<ExploreContentProps> = ({
  selectedNavLink,
  onNavLinkChange,
  selectedMainNavLink,
  onMainNavLinkChange,
  searchQuery,
  onSearchChange,
  onJoinCommunity,
}) => {
  const handleShowMore = (section: string) => {
    console.log(`Show more clicked for ${section}`);
    // Implement show more functionality
  };

  return (
    <>
      <TopNavigation
        selectedNavLink={selectedNavLink}
        onNavLinkChange={onNavLinkChange}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      <MainNavigation
        selectedMainNavLink={selectedMainNavLink}
        onMainNavLinkChange={onMainNavLinkChange}
      />

      <Box
        display="flex"
        alignItems="center"
        // mb="20px"
        // p="20px 0"
        style={{
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <H1
          fontSize="20px"
          fontWeight="600"
          color="#615B5B"
          m="0"
          fontFamily="Inter, sans-serif"
          style={{
            minWidth: 0,
            wordBreak: "break-word",
          }}
        >
          Women in Business
        </H1>
        <Button
          variant="outlined"
          size="small"
          style={{
            padding: "8px 10px",
            fontSize: "10px",
            fontWeight: "600",
            borderRadius: "8px",
            border: "1px solid #ADADAD",
            backgroundColor: "white",
            color: "#8B8B8B",
          }}
        >
          Follow Space
        </Button>
      </Box>

      <Box
        as="p"
        fontSize="14px"
        color="#6E6E6E"
        lineHeight="1.6"
        // mb="40px"
        fontFamily="Inter, sans-serif"
        maxWidth="100%"
      >
        Support, visibility, and resources for female entrepreneurs in the UAE
        to thrive in their ventures, connect with like-minded innovators, access
        expert mentorship and funding opportunities, and build sustainable
        businesses that contribute meaningfully to the region's economic growth.
      </Box>

      <CommunityGrid
        title="Featured Women in Business Communities"
        communities={featuredCommunities}
        onJoinCommunity={onJoinCommunity}
        onShowMore={() => handleShowMore("featured")}
      />

      <CommunityGrid
        title="Women Innovators & Founders"
        communities={innovatorsCommunities}
        onJoinCommunity={onJoinCommunity}
        onShowMore={() => handleShowMore("innovators")}
      />
    </>
  );
};

export default ExploreContent;
