import React from 'react';
import PropTypes from 'prop-types';

import styles from './soundBadge.module.css';

const SoundBadge = ({ author, title, cover }) => (
  <div className={styles.soundBadge}>
    <div className={styles.cover} style={{ backgroundImage: cover ? `url(${cover})` : '' }} />
    <div className={styles.titleContextContainer}>
      <span className={`${styles.title} ${styles.truncate}`}>{title}</span>
      <span className={`${styles.author} ${styles.truncate}`}>{author}</span>
    </div>
  </div>
);

SoundBadge.defaultProps = {
  author: 'No Author',
  title: 'No Title',
  cover: '',
};

SoundBadge.propTypes = {
  author: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
};

export default SoundBadge;
