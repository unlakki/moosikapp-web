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
      currentTime: 0,
      duration: 0,
      loop: false,
      shuffle: false,
      muted: false,
      volume: 1,
    };

    this.audio = createRef();
  }

  async componentDidUpdate(prev) {
    const { songs, np, pause } = this.props;

    const { song } = this.state;

    if (!songs.length) {
      return;
    }

    if (prev.np !== np) {
      await this.loadSong(songs[np].uuid);
      return;
    }

    if (prev.pause !== pause) {
      const audio = this.audio.current;

      if (pause) {
        audio.pause();
        document.title = 'Moosik';
        return;
      }

      audio.play();
      document.title = `${decodeURI(song.author)} - ${decodeURI(song.title)}`;
    }
  }

  onCanPlay(e) {
    const { setPause } = this.props;

    e.target.play();

    setPause(false);
  }

  onEnded() {
    const { songs, np, setNP } = this.props;
    const { shuffle } = this.state;

    if (shuffle) {
      setNP(Math.round(Math.random() * (songs.length - 1)));
      return;
    }

    setNP(np < songs.length - 1 ? np + 1 : -1);
  }

  onClickControl(e) {
    const type = e.currentTarget.name;

    const {
      songs, np, setNP, pause, setPause,
    } = this.props;

    switch (type) {
      case 'prev': {
        setNP(np > 0 ? np - 1 : songs.length - 1);
        break;
      }
      case 'play': {
        if (np === -1) {
          setNP(np === -1 ? 0 : np);
          return;
        }

        setPause(!pause);
        break;
      }
      case 'next': {
        setNP(np < songs.length - 1 ? np + 1 : 0);
        break;
      }
      default:
    }
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
      document.title = `${decodeURI(song.author)} - ${decodeURI(song.title)}`;
    } catch (e) {
      setError(e.message);
    }
  }

  render() {
    const { pause } = this.props;
    const {
      song, currentTime, duration, muted, loop, volume, shuffle,
    } = this.state;

    return (
      <div className={styles.player}>
        <section className={styles.wrapper}>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.control}
              name="prev"
              onClick={this.onClickControl.bind(this)}
            >
              <svg className={styles.icon}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#prev`} />
              </svg>
            </button>
            <button
              type="button"
              className={styles.control}
              name="play"
              onClick={this.onClickControl.bind(this)}
            >
              <svg className={styles.icon}>
                <use
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xlinkHref={`${icons}#${pause ? 'play' : 'pause'}`}
                />
              </svg>
            </button>
            <button
              type="button"
              className={styles.control}
              name="next"
              onClick={this.onClickControl.bind(this)}
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
            src={song.url}
            muted={muted}
            loop={loop}
            onLoadedMetadata={e => this.setState({ duration: e.target.duration })}
            onCanPlay={this.onCanPlay.bind(this)}
            onTimeUpdate={e => this.setState({ currentTime: e.target.currentTime })}
            onVolumeChange={e => this.setState({ volume: e.target.volume })}
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
  np: PropTypes.number.isRequired,
  setNP: PropTypes.func.isRequired,
  pause: PropTypes.bool.isRequired,
  setPause: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  songs: store.player.songs,
  np: store.player.nowPlaying,
  pause: store.player.paused,
});

const mapDispatchToProps = dispatch => ({
  setNP: np => dispatch(action(actions.SET_NOW_PLAYING, np)),
  setPause: pause => dispatch(action(actions.SET_PAUSE, pause)),
  setError: message => dispatch(errAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
