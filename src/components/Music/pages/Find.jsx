import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Song from '../Song';
import {
  searchSongs as searchSongsAction,
  clearSongs as clearSongsAction,
} from '../../../actions/music';

import styles from '../layouts/SongList.module.css';
import inputStyles from '../../../layouts/Input.module.css';

class Find extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
    };
  }

  componentDidMount() {
    const { clearSongs } = this.props;

    clearSongs();
  }

  render() {
    const { songs, loading, error } = this.props;

    return (
      <div className={styles.wrapper}>
        <form className={styles.findBox}>
          <input
            className={`${inputStyles.input} ${styles.findInput}`}
            type="text"
            placeholder="Search"
            onChange={e => this.setState({ searchString: e.currentTarget.value })}
          />
          <input
            className={inputStyles.button}
            type="submit"
            value="Search"
            onClick={(e) => {
              e.preventDefault();

              const { token, searchSongs } = this.props;
              const { searchString } = this.state;

              searchSongs(token, searchString, 0, 100);
            }}
          />
        </form>
        <div className={styles.songList}>
          {songs && songs.map(song => (
            <Song key={song.uuid} {...song} />
          ))}
          {songs.length === 0 && (
            <span className={styles.text}>
              {(!error && !loading) && 'Enter your request in the input field ...'}
              {loading && 'Searching ...'}
              {error && 'No songs found.'}
            </span>
          )}
        </div>
      </div>
    );
  }
}

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
  clearSongs: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  songs: store.music.songs,
  loading: store.music.loading,
  error: store.music.error,
  token: store.login.token,
});

const mapDispathToProps = dispatch => ({
  searchSongs: (token, skip, limit) => dispatch(searchSongsAction(token, skip, limit)),
  clearSongs: () => dispatch(clearSongsAction()),
});

export default connect(mapStateToProps, mapDispathToProps)(Find);
