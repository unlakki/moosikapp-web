import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles/SoundBadge.m.css';

const SoundBadge = ({ author, title, cover }) => (
  <div className={styles.soundBadge}>
    <div className={styles.cover} style={{ backgroundImage: cover ? `url(${cover})` : '' }} />
    <div className={styles.container}>
      <span className={classnames(styles.truncate, styles.title)}>{title}</span>
      <span className={classnames(styles.truncate, styles.author)}>{author}</span>
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
