import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Song from '../Song';
import { searchSongs as action } from '../../../actions/music';

import styles from '../layouts/SongList.module.css';
import inputStyles from '../../../layouts/Input.module.css';

const Find = ({
  token, songs, loading, error, searchSongs,
}) => {
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    async function fetchData() {
      await searchSongs(token, searchString, 0, 100);
    }
    fetchData();
  }, [searchString]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.findBox}>
        <input
          className={`${inputStyles.input} ${styles.findInput}`}
          type="text"
          placeholder="Search"
          onChange={e => setSearchString(e.target.value)}
        />
        <input
          className={inputStyles.button}
          type="submit"
          value="Search"
          onClick={async (e) => {
            e.preventDefault();
            await searchSongs(token, searchString, 0, 100);
          }}
        />
      </form>
      <div className={styles.songList}>
        {songs && songs.map(song => (
          <Song key={song.uuid} {...song} />
        ))}
        {songs.length === 0 && (
          <span className={styles.text}>
            {(!searchString) && 'Enter your request in the input field ...'}
            {(loading && searchString) && 'Searching ...'}
            {(error && searchString) && 'No songs found.'}
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
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  token: PropTypes.string.isRequired,
  searchSongs: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  songs: store.music.songs,
  loading: store.music.loading,
  error: store.music.error,
  token: store.login.token,
});

const mapDispathToProps = dispatch => ({
  searchSongs: (token, skip, limit) => dispatch(action(token, skip, limit)),
});

export default connect(mapStateToProps, mapDispathToProps)(Find);
