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
    const { songs } = this.props;

    return (
      <div className={styles.songList}>
        {songs && songs.map(song => (
          <Song key={song.uuid} {...song} />
        ))}
        {!songs.length && <span className={styles.nothingToShow}>Nothing to show :(</span>}
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
  token: PropTypes.string.isRequired,
  getSongs: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  songs: store.music.songs,
  token: store.login.token,
});

const mapDispathToProps = dispatch => ({
  getSongs: (token, skip, limit) => dispatch(getSongsAction(token, skip, limit)),
});

export default connect(mapStateToProps, mapDispathToProps)(All);
