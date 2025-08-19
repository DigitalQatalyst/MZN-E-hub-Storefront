"use client";

import CommunityGrid from './CommunityGrid';
import { featuredCommunities, innovatorsCommunities } from './constants';
import styles from './ExploreContent.module.css';
import MainNavigation from './MainNavigation';
import TopNavigation from './TopNavigation';

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
  onJoinCommunity
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

      <div className={styles.header}>
        <h1 className={styles.title}>Women in Business</h1>
        <button className={styles.followSpaceButton}>Follow Space</button>
      </div>

      <p className={styles.description}>
        Support, visibility, and resources for female entrepreneurs in the
        UAE to thrive in their ventures, connect with like-minded
        innovators, access expert mentorship and funding opportunities,
        and build sustainable businesses that contribute meaningfully to
        the region's economic growth.
      </p>

      <CommunityGrid
        title="Featured Women in Business Communities"
        communities={featuredCommunities}
        onJoinCommunity={onJoinCommunity}
        onShowMore={() => handleShowMore('featured')}
      />

      <CommunityGrid
        title="Women Innovators & Founders"
        communities={innovatorsCommunities}
        onJoinCommunity={onJoinCommunity}
        onShowMore={() => handleShowMore('innovators')}
      />
    </>
  );
};

export default ExploreContent;