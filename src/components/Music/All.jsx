import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Music from './Music';
import Song from './Song';
import { fetchSongs as fetchSongsAction } from '../../actions/music';

import css from './css/Music.module.css';

const All = ({
  token, songs, fetchSongs, loading, error,
}) => {
  useEffect(() => {
    fetchSongs(token);
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

All.defaultProps = {
  error: null,
};

All.propTypes = {
  token: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
    edit: PropTypes.bool,
    favorite: PropTypes.bool,
  })).isRequired,
  fetchSongs: PropTypes.func.isRequired,
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
  fetchSongs: (token, skip, limit) => dispatch(fetchSongsAction(token, skip, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(All);
