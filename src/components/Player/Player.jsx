import React, { useEffect, useState } from 'react';
import { useAudio } from 'react-use';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Timeline from './Timeline';
import VolumeSlider from './VolumeSlider';
import SoundBadge from './SoundBadge';
import * as playerActions from '../../actions/player';

import css from './css/Player.module.css';

const Player = ({
  token, songs, song, nowPlaying, playing, setSong, play, pause,
}) => {
  const [audio, state, controls, ref] = useAudio({});

  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [index, setIndex] = useState(0);

  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  useEffect(() => {
    if (song && song.url) {
      ref.current.src = song.url;
      controls.play();

      setIndex(songs.findIndex(s => s.uuid === nowPlaying));
    }
  }, [song]);

  useEffect(() => {
    if (playing) {
      controls.play();
      return;
    }

    controls.pause();
  }, [playing]);

  useEffect(() => {
    if (songs.length && state.time === state.duration) {
      const ended = async () => {
        let i;
        if (shuffle) {
          i = Math.round(Math.random() * songs.length);
        } else {
          i = index + 1;

          if (i >= songs.length) {
            i = 0;
          }
        }
        setIndex(i);

        await setSong(token, songs[i].uuid);
      };

      ended();
    }
  }, [state.time]);

  return (
    <div className={css.wrapper}>
      <section className={css.container}>
        <div className={css.controls}>
          <button
            className={css.control}
            type="button"
            aria-label="Prev"
            onClick={async () => {
              if (songs && (index > 0)) {
                await setSong(token, songs[index - 1].uuid);
                play();
              }
            }}
          >
            <svg className={css.icon}>
              <path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" />
            </svg>
          </button>
          <button
            className={css.control}
            type="button"
            aria-label="Play / Pause"
            onClick={async () => {
              if (!song && (songs.length > 0)) {
                await setSong(token, songs[0].uuid);
              }

              if (playing) {
                pause();
                return;
              }

              play();
            }}
          >
            <svg className={css.icon}>
              {state.paused
                ? <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                : <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
              }
            </svg>
          </button>
          <button
            className={css.control}
            type="button"
            aria-label="Next"
            onClick={async () => {
              if (songs && (index < songs.length - 1)) {
                await setSong(token, songs[index + 1].uuid);
                play();
              }
            }}
          >
            <svg className={css.icon}>
              <path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />
            </svg>
          </button>
          <button
            className={classnames(css.control, { [css.on]: repeat })}
            type="button"
            aria-label="Repeat"
            onClick={() => {
              ref.current.loop = !repeat;
              setRepeat(ref.current.loop);
            }}
          >
            <svg className={css.icon}>
              <path d="M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z" />
            </svg>
          </button>
          <button
            className={classnames(css.control, { [css.on]: shuffle })}
            type="button"
            aria-label="Shuffle"
            onClick={() => setShuffle(!shuffle)}
          >
            <svg className={css.icon}>
              <path
                d="M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,
                  13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,
                  4L4,5.41L9.17,10.58L10.59,9.17Z"
              />
            </svg>
          </button>
        </div>
        <Timeline
          currentTime={state.time}
          duration={state.duration}
          onTimeUpdate={controls.seek}
        />
        <div
          className={classnames(css.controls, css.volume)}
          onMouseEnter={() => setIsVolumeVisible(true)}
          onMouseLeave={() => setIsVolumeVisible(false)}
        >
          <button
            className={css.control}
            type="button"
            aria-label="Volume"
            onClick={() => {
              if (state.muted) {
                controls.unmute();
                return;
              }
              controls.mute();
            }}
          >
            <svg className={css.icon}>
              {state.muted
                ? (
                  <path
                    d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,
                    17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,
                    18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,
                    14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,
                    3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,
                    7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                  />
                ) : (
                  <path
                    d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,
                      19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,
                      7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                  />
                )
              }
            </svg>
          </button>
          <VolumeSlider
            show={isVolumeVisible}
            value={state.volume}
            onVolumeUpdate={controls.volume}
          />
        </div>
        <SoundBadge
          author={song && song.author}
          title={song && song.title}
        />
        {audio}
      </section>
    </div>
  );
};

Player.defaultProps = {
  playing: false,
  song: null,
};

Player.propTypes = {
  token: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
  })).isRequired,
  song: PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
    url: PropTypes.string,
  }),
  playing: PropTypes.bool,
  nowPlaying: PropTypes.string.isRequired,
  setSong: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  songs: store.music.songs,
  song: store.player.song,
  playing: store.player.playing,
  nowPlaying: store.player.nowPlaying,
});

const mapDispatchToProps = dispatch => ({
  setSong: (token, uuid) => dispatch(playerActions.setSong(token, uuid)),
  play: () => dispatch(playerActions.play()),
  pause: () => dispatch(playerActions.pause()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
