/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timeline from './Timeline';
import VolumeSlider from './VolumeSlider';
import SoundBadge from './SoundBadge';
import {
  setSong as setSongAction,
  play as playAction,
  pause as pauseAction,
} from '../../actions/player';

import styles from './layouts/Player.module.css';

const Player = ({
  token, songs, song, playing, setSong, play, pause, np,
}) => {
  const audio = useRef();

  const [readyToPlay, setReadyToPlay] = useState(false);
  const [passed, setPassed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mute, setMute] = useState(false);
  const [loop, setLoop] = useState(false);
  const [index, setIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    if (!readyToPlay) {
      return;
    }

    if (playing) {
      audio.current.play();

      document.title = `${song.author} - ${song.title} | Moosik`;

      setIndex(songs.findIndex(v => v.uuid === np));
      return;
    }

    audio.current.pause();

    document.title = 'Moosik';
  }, [songs, playing, np, readyToPlay]);


  return (
    <div className={styles.wrapper}>
      <section className={styles.inner}>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.button}
            onClick={async () => {
              if (index <= 0) {
                return;
              }
              const i = index - 1;
              await setSong(token, songs[i].uuid);
              setIndex(i);
            }}
          >
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={async () => {
              if (!np) {
                await setSong(token, songs[0].uuid);
                return;
              }

              if (playing) {
                pause();
                return;
              }
              play();
            }}
          >
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path
                d={playing
                  ? 'M14,19H18V5H14M6,19H10V5H6V19Z'
                  : 'M8,5.14V19.14L19,12.14L8,5.14Z'}
              />
            </svg>
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={async () => {
              if (index >= songs.length - 1) {
                return;
              }
              const i = index + 1;
              await setSong(token, songs[i].uuid);
              setIndex(i);
            }}
          >
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />
            </svg>
          </button>
          <button type="button" className={styles.button} onClick={() => setLoop(!loop)}>
            <svg className={`${styles.icon} ${loop ? styles.on : ''}`} viewBox="0 0 24 24">
              <path d="M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z" />
            </svg>
          </button>
          <button type="button" className={styles.button} onClick={() => setShuffle(!shuffle)}>
            <svg className={`${styles.icon} ${shuffle ? styles.on : ''}`} viewBox="0 0 24 24">
              <path
                d="M14.83,13.41L13.42,14.82L16.55,17.95L14.5,20H20V14.5L17.96,16.54L14.83,13.41M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17Z"
              />
            </svg>
          </button>
        </div>
        <Timeline
          currentTime={passed}
          duration={duration}
          onChange={(v) => {
            audio.current.currentTime = v;
          }}
        />
        <div className={`${styles.controls} ${styles.volume}`}>
          <button type="button" className={styles.button} onClick={() => setMute(!mute)}>
            <svg className={styles.icon}>
              <path
                d={mute
                  ? 'M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z'
                  : 'M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z'}
              />
            </svg>
          </button>
          <VolumeSlider
            value={1}
            onChange={(v) => {
              audio.current.volume = v;
            }}
          />
        </div>
        <SoundBadge
          author={(song && song.author) ? song.author : 'Author'}
          title={(song && song.title) ? song.title : 'Title'}
          cover={(song && song.cover) ? song.cover : null}
        />
        <audio
          ref={audio}
          crossOrigin="anonymous"
          preload="auto"
          src={(song && song.url) ? song.url : ''}
          muted={mute}
          loop={loop}
          onLoadStart={() => setReadyToPlay(false)}
          onLoadedMetadata={e => setDuration(e.target.duration)}
          onCanPlay={() => setReadyToPlay(true)}
          onTimeUpdate={e => setPassed(e.target.currentTime)}
          onEnded={async () => {
            pause();

            if (shuffle) {
              const i = Math.round(Math.random() * (songs.length - 1));
              await setSong(token, songs[i].uuid);
              play();
              return;
            }

            if (index >= songs.length - 1) {
              return;
            }
            const i = index + 1;
            await setSong(token, songs[i].uuid);
            play();
          }}
        />
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
  setSong: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  np: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  songs: store.music.songs,
  song: store.player.song,
  playing: store.player.playing,
  np: store.player.nowPlaying,
});

const mapDispatchToProps = dispatch => ({
  setSong: (token, uuid) => dispatch(setSongAction(token, uuid)),
  play: () => dispatch(playAction()),
  pause: () => dispatch(pauseAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
