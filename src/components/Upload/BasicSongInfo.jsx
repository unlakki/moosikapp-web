import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

import styles from './layouts/BasicSongInfo.module.css';
import inputStyles from '../../layouts/Input.module.css';

const { REACT_APP_API_URL = '' } = process.env;

const BasicSongInfo = ({ uuid, token }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const uuids = {
    author: uuidv4(),
    title: uuidv4(),
    image: uuidv4(),
  };

  return (
    <div className={styles.basicInfo}>
      <div
        className={styles.image}
        style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : '' }}
      >
        <div className={styles.hover} />
        <label htmlFor={uuids.image} className={styles.picker}>
          <span>Choose image</span>
          <input id={uuids.image} className={styles.input} type="file" accept="image/*" />
        </label>
      </div>
      <div className={styles.titleAndAuthor}>
        <label htmlFor={uuids.author} className={styles.label}>
          <span>Author:</span>
          <input
            id={uuids.author}
            className={inputStyles.input}
            type="text"
            onChange={e => setAuthor(e.target.value)}
          />
        </label>
        <label htmlFor={uuids.title} className={styles.label}>
          <span>Title:</span>
          <input
            id={uuids.title}
            className={inputStyles.input}
            type="text"
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <div className={styles.save}>
          <button
            className={inputStyles.button}
            type="button"
            onClick={async () => {
              try {
                await axios(`${REACT_APP_API_URL}/api/songs/${uuid}`, {
                  method: 'PATCH',
                  headers: {
                    accept: 'application/vnd.moosikapp.v1+json',
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`,
                  },
                  data: JSON.stringify({ author, title, image: imageUrl }),
                }).then(r => r.data);
              } catch (e) {
                // error message
                console.error(e);
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

BasicSongInfo.propTypes = {
  uuid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(BasicSongInfo);
