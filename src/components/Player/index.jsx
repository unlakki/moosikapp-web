import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action, { actions } from '../../actions/player';
import errAction from '../../actions/error';
import Timeline from './components/Timeline';
import VolumeSlider from './components/VolumeSlider';
import SoundBadge from './components/SoundBadge';

import styles from './player.module.css';

import icons from './icons.svg';

const { REACT_APP_API_URL = '' } = process.env;

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      song: {},
      songIndex: -1,
      currentTime: 0,
      duration: 0,
      loop: false,
      shuffle: false,
      muted: false,
      volume: 1,
    };

    this.audio = createRef();
  }

  async componentWillReceiveProps({ songs, nowPlaying, paused }) {
    const { song } = this.state;

    if (nowPlaying !== '' && song.uuid !== nowPlaying) {
      this.setState({ songIndex: songs.findIndex(v => v.uuid === nowPlaying) });

      await this.loadSong(nowPlaying);
    }

    const audio = this.audio.current;

    if (paused) {
      audio.pause();
      return;
    }

    audio.play();
  }

  componentDidUpdate() {
    const { song } = this.state;
    const { paused } = this.props;

    if (!song.author || !song.title || paused) {
      document.title = 'Moosik';
      return;
    }

    document.title = `${song.author} - ${song.title}`;
  }

  onEnded() {
    const { songs, setNP } = this.props;
    const { songIndex, shuffle } = this.state;

    if (shuffle) {
      setNP(songs[Math.round(Math.random() * (songs.length - 1))]);
      return;
    }

    setNP(songs[songIndex < songs.length - 1 ? songIndex + 1 : 0].uuid);
  }

  async loadSong(uuid) {
    const { token, setError } = this.props;

    const uri = `${REACT_APP_API_URL}/api/songs/${uuid}`;

    const headers = {
      accept: 'application/vnd.moosikapp.v1+json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    };

    try {
      const { message, song } = await fetch(uri, {
        method: 'GET',
        headers,
      }).then(r => r.json());

      if (!song) {
        throw new Error(message);
      }

      this.setState({ song });
    } catch (e) {
      setError(e.message);
    }
  }

  render() {
    const {
      songs, setNP, paused, togglePause,
    } = this.props;
    const {
      song, songIndex, currentTime, duration, muted, loop, volume, shuffle,
    } = this.state;

    return (
      <div className={styles.player}>
        <section className={styles.wrapper}>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.control}
              onClick={() => {
                if (!songs.length) {
                  return;
                }

                setNP(songs[songIndex > 0 ? songIndex - 1 : songs.length - 1].uuid);
              }}
            >
              <svg className={styles.icon}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#prev`} />
              </svg>
            </button>
            <button
              type="button"
              className={styles.control}
              onClick={() => {
                if (!songs.length) {
                  return;
                }

                if (songIndex === -1) {
                  setNP(songs[0].uuid);
                  return;
                }

                togglePause(!paused);
              }}
            >
              <svg className={styles.icon}>
                <use
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref={`${icons}#${paused ? 'play' : 'pause'}`}
                />
              </svg>
            </button>
            <button
              type="button"
              className={styles.control}
              onClick={() => {
                if (!songs.length) {
                  return;
                }

                setNP(songs[songIndex < songs.length - 1 ? songIndex + 1 : 0].uuid);
              }}
            >
              <svg className={styles.icon}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#next`} />
              </svg>
            </button>
            <button
              type="button"
              className={styles.control}
              onClick={() => this.setState(prev => ({ loop: !prev.loop }))}
            >
              <svg className={`${styles.icon} ${loop ? styles.active : ''}`}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#repeat`} />
              </svg>
            </button>
            <button
              type="button"
              className={styles.control}
              onClick={() => this.setState(prev => ({ shuffle: !prev.shuffle }))}
            >
              <svg className={`${styles.icon} ${shuffle ? styles.active : ''}`}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#shuffle`} />
              </svg>
            </button>
          </div>
          <Timeline
            currentTime={currentTime}
            duration={duration}
            onChange={(value) => { this.audio.current.currentTime = value; }}
          />
          <div className={`${styles.controls} ${styles.volume}`}>
            <button
              type="button"
              className={styles.control}
              onClick={() => this.setState(prev => ({ muted: !prev.muted }))}
            >
              <svg className={styles.icon}>
                <use
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref={`${icons}#${muted ? 'mute' : 'volume'}`}
                />
              </svg>
            </button>
            <VolumeSlider
              value={volume}
              onChange={(value) => { this.audio.current.volume = value; }}
            />
          </div>
          <SoundBadge author={song.author} title={song.title} cover={song.cover} />
          <audio
            ref={this.audio}
            crossOrigin="anonymous"
            preload="auto"
            src={song.url}
            autoPlay
            loop={loop}
            muted={muted}
            onLoadedMetadata={event => this.setState({ duration: event.target.duration })}
            onCanPlay={() => togglePause(false)}
            onTimeUpdate={event => this.setState({ currentTime: event.target.currentTime })}
            onVolumeChange={event => this.setState({ volume: event.target.volume })}
            onEnded={this.onEnded.bind(this)}
          />
        </section>
      </div>
    );
  }
}

Player.propTypes = {
  token: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
  })).isRequired,
  nowPlaying: PropTypes.string.isRequired,
  setNP: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
  togglePause: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  songs: store.player.songs,
  nowPlaying: store.player.nowPlaying,
  paused: store.player.paused,
});

const mapDispatchToProps = dispatch => ({
  setNP: nowPlaying => dispatch(action(actions.SET_NOW_PLAYING, nowPlaying)),
  togglePause: paused => dispatch(action(actions.SET_PAUSE, paused)),
  setError: message => dispatch(errAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
