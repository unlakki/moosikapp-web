import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Music from './Music';
import Song from './Song';
import { fetchFavoriteSongs as fetchFavoriteSongsAction } from '../../actions/music';

import css from './css/Music.module.css';

const Favorites = ({
  token, songs, fetchFavoriteSongs, loading, error,
}) => {
  useEffect(() => {
    fetchFavoriteSongs(token);
  }, []);

  return (
    <Music>
      <div className={css.songs}>
        {songs.map(song => <Song key={song.uuid} {...song} />)}
        {songs.length === 0 && (
          <span className={css.message}>
            {loading && 'Loading ...'}
            {error && 'Nothing to show :('}
          </span>
        )}
      </div>
    </Music>
  );
};

Favorites.defaultProps = {
  error: null,
};

Favorites.propTypes = {
  token: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
    edit: PropTypes.bool,
    favorite: PropTypes.bool,
  })).isRequired,
  fetchFavoriteSongs: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = store => ({
  token: store.login.token,
  songs: store.music.songs,
  loading: store.music.loading,
  error: store.music.error,
});

const mapDispatchToProps = dispatch => ({
  fetchFavoriteSongs: (token, skip, limit) => dispatch(
    fetchFavoriteSongsAction(token, skip, limit),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
