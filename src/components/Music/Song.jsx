import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import styles from './layouts/Song.module.css';

const { REACT_APP_API_URL = '' } = process.env;

const Song = ({
  uuid, author, title, cover, edit, favorite, token,
}) => {
  const [fav, setFav] = useState(favorite);

  return (
    <div className={styles.container}>
      <div className={styles.cover} style={{ backgroundImage: cover ? `url(${cover})` : '' }}>
        <button className={`${styles.button} ${styles.play}`} type="button">
          <svg viewBox="0 0 24 24">
            <path
              d={true
                ? 'M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
                : 'M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'}
            />
          </svg>
        </button>
        {!cover && (
          <svg viewBox="0 0 24 24">
            <path
              d="M12,3V12.26C11.5,12.09 11,12 10.5,12C8,12 6,14 6,16.5C6,19 8,21 10.5,21C13,21 15,19 15,16.5V6H19V3H12Z"
            />
          </svg>
        )}
      </div>
      <div className={styles.titleAndAuthor}>
        <span className={styles.title}>{title}</span>
        <span className={styles.author}>{author}</span>
      </div>
      <div className={styles.actions}>
        {edit && (
          <button className={`${styles.button} ${styles.action}`} type="button">
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path
                d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
              />
            </svg>
          </button>
        )}
        <button
          className={`${styles.button} ${styles.action}`}
          type="button"
          onClick={async () => {
            try {
              await axios(`${REACT_APP_API_URL}/api/favorites/${uuid}`, {
                method: fav ? 'DELETE' : 'POST',
                headers: {
                  accept: 'application/vnd.moosikapp.v1+json',
                  'content-type': 'application/json',
                  authorization: `Bearer ${token}`,
                },
              });
              setFav(!fav);
            } catch (e) {
              // error message
              console.error(e);
            }
          }}
        >
          <svg className={`${styles.icon}${fav ? ` ${styles.on}` : ''}`} viewBox="0 0 24 24">
            <path
              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

Song.defaultProps = {
  cover: '',
  edit: false,
  favorite: true,
};

Song.propTypes = {
  uuid: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  edit: PropTypes.bool,
  favorite: PropTypes.bool,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(Song);
