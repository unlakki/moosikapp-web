import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Song from '../Song';
import { getSongs as getSongsAction } from '../../../actions/music';

import styles from '../layouts/SongList.module.css';

class All extends PureComponent {
  componentDidMount() {
    const { token, getSongs } = this.props;

    getSongs(token, 0, 100);
  }

  render() {
    const { songs, loading, error } = this.props;

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
  }
}

All.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  token: PropTypes.string.isRequired,
  getSongs: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  songs: store.music.songs,
  loading: store.music.loading,
  error: store.music.error,
  token: store.login.token,
});

const mapDispathToProps = dispatch => ({
  getSongs: (token, skip, limit) => dispatch(getSongsAction(token, skip, limit)),
});

export default connect(mapStateToProps, mapDispathToProps)(All);
