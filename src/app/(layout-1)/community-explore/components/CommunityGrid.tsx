"use client";

import CommunityCard from './CommunityCard';
import styles from './CommunityGrid.module.css';
import { CommunityCard as CommunityCardType } from './types';


interface CommunityGridProps {
  title: string;
  communities: CommunityCardType[];
  onJoinCommunity?: (id: string) => void;
  showMoreButton?: boolean;
  onShowMore?: () => void;
}

const CommunityGrid: React.FC<CommunityGridProps> = ({
  title,
  communities,
  onJoinCommunity,
  showMoreButton = true,
  onShowMore
}) => {
  return (
    <>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.communityGrid}>
        {communities.map((community) => (
          <CommunityCard
            key={community.id}
            community={community}
            onJoin={onJoinCommunity}
          />
        ))}
      </div>
      {showMoreButton && (
        <button className={styles.showMoreButton} onClick={onShowMore}>
          Show more
        </button>
      )}
    </>
  );
};

export default CommunityGrid;