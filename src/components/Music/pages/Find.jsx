import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Song from '../Song';
import {
  searchSongs as searchAction,
  clearSongs as clearAction,
} from '../../../actions/music';

import styles from '../layouts/SongList.module.css';
import inputStyles from '../../../layouts/Input.module.css';

const Find = ({
  token, songs, skip, limit, searchSongs, loading, error, clearSongs,
}) => {
  const [query, SetQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      await searchSongs(token, query, skip, limit);
    }

    if (query.length > 2) {
      fetchData();
      return;
    }
    clearSongs();
  }, [token, query, skip, limit, searchSongs, clearSongs]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.findBox}>
        <input
          className={`${inputStyles.input} ${styles.findInput}`}
          type="text"
          placeholder="Search"
          onChange={e => SetQuery(e.target.value)}
        />
        <input
          className={inputStyles.button}
          type="submit"
          value="Search"
          onClick={async (e) => {
            e.preventDefault();
            await searchSongs(token, query, 0, 100);
          }}
        />
      </form>
      <div className={styles.songList}>
        {songs && songs.map(song => (
          <Song key={song.uuid} {...song} />
        ))}
        {songs.length === 0 && (
          <span className={styles.text}>
            {(!loading && !error) && 'Enter your request in the input field ...'}
            {(loading) && 'Searching ...'}
            {(error) && 'No songs found.'}
          </span>
        )}
      </div>
    </div>
  );
};

Find.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
  })).isRequired,
  skip: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  token: PropTypes.string.isRequired,
  searchSongs: PropTypes.func.isRequired,
  clearSongs: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  songs: store.music.songs,
  skip: store.music.skip,
  limit: store.music.limit,
  loading: store.music.loading,
  error: store.music.error,
  token: store.login.token,
});

const mapDispathToProps = dispatch => ({
  searchSongs: (token, skip, limit) => dispatch(searchAction(token, skip, limit)),
  clearSongs: () => dispatch(clearAction()),
});

export default connect(mapStateToProps, mapDispathToProps)(Find);
