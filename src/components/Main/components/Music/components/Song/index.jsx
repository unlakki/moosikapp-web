import React from 'react';
import PropTypes from 'prop-types';

import styles from './song.module.css';

import icons from './icons.svg';

const Song = ({ author, title, editable }) => (
  <div className={styles.song}>
    <div className={styles.cover} style={{ backgroundImage: null }}>
      {true && (
        <svg className={styles.defaultCover}>
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#defaultCover`} />
        </svg>
      )}
      <svg className={styles.play}>
        <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#${true ? 'play' : 'pause'}`} />
      </svg>
    </div>
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.author}>{author}</div>
      </div>
      <div className={styles.actions}>
        <svg className={styles.button}>
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#${true ? 'select' : 'deselect'}`} />
        </svg>
        {editable && (
          <svg className={styles.button}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#edit`} />
          </svg>
        )}
      </div>
    </div>
  </div>
);

Song.defaultProps = {
  editable: false,
};

Song.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  editable: PropTypes.bool,
};

export default Song;
