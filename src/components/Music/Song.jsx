import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as playerActions from '../../actions/player';
import {
  addToFavorites,
  deleteFromFavorites,
} from '../../utils/requests';

import css from './css/Song.module.css';

const togglePlayFunc = (
  uuid, playing, token, nowPlaying, setSong, play, pause,
) => async () => {
  if (uuid !== nowPlaying) {
    await setSong(token, uuid);
    play();
    return;
  }

  if (playing) {
    pause();
    return;
  }

  play();
};

const toggleFavFunc = (
  uuid, token, fav, setFav,
) => async () => {
  if (fav) {
    await deleteFromFavorites(token, uuid);
    setFav(false);
    return;
  }

  await addToFavorites(token, uuid);
  setFav(true);
};

const Song = ({
  uuid, author, title, cover, playing, editable, favorite, token, nowPlaying, setSong, play, pause,
}) => {
  const [fav, setFav] = useState(favorite);

  return (
    <div className={css.song}>
      <div className={css.cover} style={{ backgroundImage: cover ? `url(${cover})` : null }}>
        {!cover && (
          <svg viewBox="0 0 24 24" className={css.defaultCover}>
            <path
              d="M12,3V12.26C11.5,12.09 11,12 10.5,12C8,12 6,14 6,16.5C6,19 8,21
                10.5,21C13,21 15,19 15,16.5V6H19V3H12Z"
            />
          </svg>
        )}
        <button
          className={css.play}
          type="button"
          onClick={togglePlayFunc(uuid, playing, token, nowPlaying, setSong, play, pause)}
        >
          <svg viewBox="0 0 24 24">
            <path
              d={(uuid === nowPlaying && playing)
                ? 'M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
                : 'M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'}
            />
          </svg>
        </button>
      </div>
      <div className={css.titleAndAuthor}>
        <span className={css.title}>{title}</span>
        <span className={css.author}>{author}</span>
      </div>
      <div className={css.actions}>
        {editable && (
          <button className={classnames(css.button, { [css.on]: editable })} type="button">
            <svg className={css.icon} viewBox="0 0 24 24">
              <path
                d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9
                16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
              />
            </svg>
          </button>
        )}
        <button
          className={classnames(css.button, { [css.on]: fav })}
          type="button"
          onClick={toggleFavFunc(uuid, token, fav, setFav)}
        >
          <svg className={css.icon} viewBox="0 0 24 24">
            <path
              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3
                10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27
                18.6,15.36 13.45,20.03L12,21.35Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

Song.defaultProps = {
  author: 'No Author',
  title: 'No Title',
  cover: null,
  playing: false,
  editable: false,
  favorite: true,
};

Song.propTypes = {
  uuid: PropTypes.string.isRequired,
  author: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
  playing: PropTypes.bool,
  editable: PropTypes.bool,
  favorite: PropTypes.bool,
  token: PropTypes.string.isRequired,
  setSong: PropTypes.func.isRequired,
  nowPlaying: PropTypes.string.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  nowPlaying: store.player.nowPlaying,
  playing: store.player.playing,
});

const mapDispatchToProps = dispatch => ({
  setSong: (token, uuid) => dispatch(playerActions.setSong(token, uuid)),
  play: () => dispatch(playerActions.play()),
  pause: () => dispatch(playerActions.pause()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Song);
