import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { updateSong } from '../../utils/requests';

import css from './css/SongInfoEditor.module.css';

const SongInfoEditor = ({ token, uuid }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');

  const uuids = {
    author: uuidv4(),
    title: uuidv4(),
    cover: uuidv4(),
  };

  return (
    <form
      className={css.songInfoEditor}
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await updateSong(token, uuid, { author, title });
        } catch (error) {
          // console.error(error);
        }
      }}
    >
      <div className={css.cover} style={{ backgroundImage: cover ? `url(${cover})` : null }}>
        <div className={css.hover} />
        <label className={css.coverButton} htmlFor={uuids.cover}>
          <span>Choose image</span>
          <input
            id={uuids.cover}
            className={css.coverInput}
            type="file"
            accept="image/*"
            disabled
            onChange={(e) => {
              const image = e && e.target && e.target.files[0];

              if (!image) {
                return;
              }

              setCover(URL.createObjectURL(image));
            }}
          />
        </label>
      </div>
      <div className={css.titleAndAuthor}>
        <label className={css.label} htmlFor={uuids.author}>
          <span>Author:</span>
          <input
            id={uuids.author}
            className={css.input}
            type="text"
            onChange={e => setAuthor(e.target.value)}
          />
        </label>
        <label className={css.label} htmlFor={uuids.title}>
          <span>Title:</span>
          <input
            id={uuids.title}
            className={css.input}
            type="text"
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <div className={css.container}>
          <input className={css.submit} type="submit" value="Save" />
        </div>
      </div>
    </form>
  );
};

SongInfoEditor.propTypes = {
  uuid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(SongInfoEditor);
