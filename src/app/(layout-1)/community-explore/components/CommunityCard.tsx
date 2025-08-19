"use client";

import styles from './CommunityCard.module.css';
import { CommunityCardProps } from './types';

const CommunityCard: React.FC<CommunityCardProps> = ({ community, onJoin }) => {
  const handleJoin = () => {
    if (onJoin) {
      onJoin(community.id);
    }
  };

  return (
    <div className={styles.communityCard} key={community.id}>
      <div className={styles.cardHeader}>
        <img
          src={community.avatar}
          alt={`${community.title} Avatar`}
          className={styles.avatar}
        />
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{community.title}</h3>
          <p className={styles.cardMembers}>{community.members}</p>
        </div>
        <button
          className={styles.joinButton}
          aria-label={`Join ${community.title}`}
          onClick={handleJoin}
        >
          Join
        </button>
      </div>
      <p className={styles.cardDescription}>{community.description}</p>
    </div>
  );
};

export default CommunityCard;