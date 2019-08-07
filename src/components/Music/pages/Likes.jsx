import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Song from '../Song';
import { fetchFavoriteSongs as action } from '../../../actions/music';

import styles from '../layouts/SongList.module.css';

const Likes = ({
  token, songs, fetchFavoriteSongs, loading, error,
}) => {
  useEffect(() => {
    async function fetchData() {
      await fetchFavoriteSongs(token, 0, 100);
    }

    fetchData();
  }, []);

  return (
    <div className={styles.songList}>
      {songs && songs.map(song => (
        <Song key={song.uuid} {...song} />
      ))}
      {songs.length === 0 && (
        <span className={styles.text}>
          {loading && 'Loading ...'}
          {error && 'Nothing to show :('}
        </span>
      )}
    </div>
  );
};

Likes.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  token: PropTypes.string.isRequired,
  fetchFavoriteSongs: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  songs: store.music.songs,
  loading: store.music.loading,
  error: store.music.error,
  token: store.login.token,
});

const mapDispathToProps = dispatch => ({
  fetchFavoriteSongs: (token, skip, limit) => dispatch(action(token, skip, limit)),
});

export default connect(mapStateToProps, mapDispathToProps)(Likes);
