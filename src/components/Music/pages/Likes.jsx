import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Song from '../Song';
import { getFavoriteSongs as getFavoriteSongsAction } from '../../../actions/music';

import styles from '../layouts/SongList.module.css';

class Likes extends PureComponent {
  componentDidMount() {
    const { token, getFavoriteSongs } = this.props;

    getFavoriteSongs(token, 0, 100);
  }

  render() {
    const { songs, loading, error } = this.props;

    return (
      <div className={styles.songList}>
        {songs && songs.map(song => (
          <Song key={song.uuid} {...song} />
        ))}
        <span className={styles.text}>
          {loading && 'Loading ...'}
          {error && 'Nothing to show :('}
        </span>
      </div>
    );
  }
}

Likes.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
  })).isRequired,
  loading: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  getFavoriteSongs: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  songs: store.music.songs,
  loading: store.music.loading,
  error: store.music.error,
  token: store.login.token,
});

const mapDispathToProps = dispatch => ({
  getFavoriteSongs: (token, skip, limit) => dispatch(getFavoriteSongsAction(token, skip, limit)),
});

export default connect(mapStateToProps, mapDispathToProps)(Likes);
