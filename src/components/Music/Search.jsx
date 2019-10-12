import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Music from './Music';
import Song from './Song';
import {
  searchSongs as searchSongsAction,
  clearSongs as clearSongsAction,
} from '../../actions/music';

import css from './css/Music.module.css';

const Search = ({
  token, songs, searchSongs, loading, error, clearSongs,
}) => {
  useEffect(() => {
    clearSongs();
  }, []);

  const [query, setQuery] = useState('');

  return (
    <Music>
      <form
        className={css.searchForm}
        onSubmit={(event) => {
          event.preventDefault();
          searchSongs(token, query);
        }}
      >
        <input
          className={css.input}
          type="text"
          placeholder="Search"
          onChange={event => setQuery(event.target.value)}
        />
        <input className={css.submit} type="submit" value="Search" />
      </form>
      <div className={css.songs}>
        {songs.length === 0 && (
          <span className={css.message}>
            {(!loading && !error) && 'Enter your request in the input field ...'}
            {(loading) && 'Searching ...'}
            {(error) && 'No songs found.'}
          </span>
        )}
        {songs.map(song => <Song key={song.uuid} {...song} />)}
      </div>
    </Music>
  );
};

Search.defaultProps = {
  error: null,
};

Search.propTypes = {
  token: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
    edit: PropTypes.bool,
    favorite: PropTypes.bool,
  })).isRequired,
  searchSongs: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  clearSongs: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  songs: store.music.songs,
  loading: store.music.loading,
  error: store.music.error,
});

const mapDispatchToProps = dispatch => ({
  searchSongs: (token, skip, limit) => dispatch(searchSongsAction(token, skip, limit)),
  clearSongs: () => dispatch(clearSongsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
