import React from 'react';
import PropTypes from 'prop-types';

import styles from './soundBadge.module.css';

const SoundBadge = ({ author, title, coverUrl }) => (
  <div className={styles.soundBadge}>
    <img className={styles.cover} src={coverUrl} alt="song cover" />
    <div className={styles.titleContextContainer}>
      <span className={`${styles.title} ${styles.truncate}`}>{title}</span>
      <span className={`${styles.author} ${styles.truncate}`}>{author}</span>
    </div>
  </div>
);

SoundBadge.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  coverUrl: PropTypes.string.isRequired,
};

export default SoundBadge;
