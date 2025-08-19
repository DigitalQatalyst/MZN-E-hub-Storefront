"use client";

import styles from './ComingSoon.module.css';
import { ComingSoonProps } from './types';

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className={styles.comingSoon}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>Coming Soon</p>
    </div>
  );
};

export default ComingSoon;