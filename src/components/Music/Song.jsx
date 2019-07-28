import React from 'react';
import PropTypes from 'prop-types';

import styles from './layouts/Song.module.css';

import icons from './images/IconPack.svg';

const Song = ({
  author, title, cover, edit, favorite,
}) => (
  <div className={styles.container}>
    <div className={styles.cover} style={{ backgroundImage: cover ? `url(${cover})` : '' }}>
      <button className={`${styles.button} ${styles.play}`} type="button">
        <svg>
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#play`} />
        </svg>
      </button>
    </div>
    <div className={styles.titleAndAuthor}>
      <span className={styles.title}>{title}</span>
      <span className={styles.author}>{author}</span>
    </div>
    <div className={styles.actions}>
      {edit && (
        <button className={`${styles.button} ${styles.action}`} type="button">
          <svg className={styles.icon}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#edit`} />
          </svg>
        </button>
      )}
      {favorite && (
        <button className={`${styles.button} ${styles.action}`} type="button">
          <svg className={styles.icon}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#like`} />
          </svg>
        </button>
      )}
    </div>
  </div>
);

Song.defaultProps = {
  cover: '',
  edit: false,
  favorite: false,
};

Song.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  edit: PropTypes.bool,
  favorite: PropTypes.bool,
};

export default Song;
