import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action, { actions } from '../../actions/player';
import errAction from '../../actions/error';
import Timeline from './components/Timeline';
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

  componentDidMount() {
    const { token, setSongs, setError } = this.props;

    fetch(`${REACT_APP_API_URL}/api/songs`, {
      method: 'GET',
      headers: {
        accept: 'application/vnd.moosik.v1+json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((res) => {
        const { message, songs } = res;

        if (!songs) {
          setError(message);
          return;
        }

        setSongs(songs);
      })
      .catch((error) => {
        setError(error.toString());
      });
  }

  componentDidUpdate(prev) {
    const {
      token, songs, nowPlaying, paused, setError,
    } = this.props;

    if (!songs.length) {
      return;
    }

    if (prev.nowPlaying !== nowPlaying) {
      fetch(`${REACT_APP_API_URL}/api/songs/${songs[nowPlaying].uuid}`, {
        method: 'GET',
        headers: {
          accept: 'application/vnd.moosik.v1+json',
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then((res) => {
          const { message, song } = res;

          if (!song) {
            setError(message);
            return;
          }

          this.setState({ song });
        })
        .catch((error) => {
          setError(error.toString());
        });

      return;
    }

    if (prev.paused !== paused) {
      const audio = this.audio.current;

      if (paused) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }

  prev() {
    const { nowPlaying, setNowPlaying } = this.props;
    if (nowPlaying > 0) {
      setNowPlaying(nowPlaying - 1);
    }
  }

  play() {
    const {
      nowPlaying, setNowPlaying, paused, setPause,
    } = this.props;

    if (nowPlaying === -1) {
      setNowPlaying(nowPlaying === -1 ? 0 : nowPlaying);
      return;
    }

    setPause(!paused);
  }

  next() {
    const { songs, nowPlaying, setNowPlaying } = this.props;
    if (nowPlaying < songs.length - 1) {
      setNowPlaying(nowPlaying + 1);
    }
  }

  repeat() {
    this.setState(prev => ({ loop: !prev.loop }));
  }

  shuffle() {
    this.setState(prev => ({ shuffle: !prev.shuffle }));
  }

  mute() {
    this.setState(prev => ({ muted: !prev.muted }));
  }

  changeVolume(e) {
    let { target } = e;
    if (target.classList.contains(styles.volumeBar)) {
      target = target.parentNode;
    }

    const r = target.getBoundingClientRect();
    const v = 1 - (e.clientY - r.top) / r.height;

    if ((v < 0) || (v > 1)) {
      return;
    }

    this.audio.current.volume = v;
  }

  update(e) {
    const { setPause } = this.props;

    const {
      paused, currentTime, duration, volume,
    } = e.target;

    this.setState({ currentTime, duration, volume });
    setPause(paused);
  }

  ended() {
    const { songs, nowPlaying, setNowPlaying } = this.props;
    const { shuffle } = this.state;

    if (shuffle) {
      setNowPlaying(Math.round(Math.random() * (songs.length - 1)));
      return;
    }

    if (nowPlaying < songs.length - 1) {
      setNowPlaying(nowPlaying + 1);
    }
  }

  render() {
    const { paused } = this.props;
    const {
      song, currentTime, duration, muted, loop, volume, shuffle,
    } = this.state;

    return (
      <div className={styles.player}>
        <section className={styles.wrapper}>
          <div className={styles.controls}>
            <button type="button" className={styles.control} onClick={this.prev.bind(this)}>
              <svg className={styles.controlIcon}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#prev`} />
              </svg>
            </button>
            <button type="button" className={styles.control} onClick={this.play.bind(this)}>
              <svg className={styles.controlIcon}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#${paused ? 'play' : 'pause'}`} />
              </svg>
            </button>
            <button type="button" className={styles.control} onClick={this.next.bind(this)}>
              <svg className={styles.controlIcon}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#next`} />
              </svg>
            </button>
            <button type="button" className={styles.control} onClick={this.repeat.bind(this)}>
              <svg className={styles.controlIcon}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#repeat`} style={{ fill: loop ? 'var(--red-dark)' : '' }} />
              </svg>
            </button>
            <button type="button" className={styles.control} onClick={this.shuffle.bind(this)}>
              <svg className={styles.controlIcon}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#shuffle`} style={{ fill: shuffle ? 'var(--red-dark)' : '' }} />
              </svg>
            </button>
          </div>
          <Timeline timePassed={currentTime} duration={duration || 0} />
          <div className={`${styles.controls} ${styles.volume}`}>
            <button type="button" className={styles.control} onClick={this.mute.bind(this)}>
              <svg className={styles.controlIcon}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#${muted ? 'mute' : 'volume'}`} />
              </svg>
            </button>
            <div className={styles.volumeWrapper}>
              <div className={styles.volumeSlider} role="presentation" onClick={this.changeVolume.bind(this)}>
                <div className={styles.volumeBackground} />
                <div className={styles.volumeBar} style={{ height: `${100 * volume}%` }} />
              </div>
            </div>
          </div>
          <SoundBadge author={song.author} title={song.title} cover={song.cover} />
          <audio
            ref={this.audio}
            autoPlay
            src={song.url}
            muted={muted}
            loop={loop}
            onCanPlay={this.update.bind(this)}
            onEnded={this.ended.bind(this)}
            onTimeUpdate={this.update.bind(this)}
            onVolumeChange={this.update.bind(this)}
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
  setSongs: PropTypes.func.isRequired,
  nowPlaying: PropTypes.number.isRequired,
  setNowPlaying: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
  setPause: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  songs: store.player.songs,
  nowPlaying: store.player.nowPlaying,
  paused: store.player.paused,
});

const mapDispatchToProps = dispatch => ({
  setSongs: songs => dispatch(action(actions.SET_SONGS, songs)),
  setNowPlaying: np => dispatch(action(actions.SET_NOW_PLAYING, np)),
  setPause: paused => dispatch(action(actions.SET_PAUSE, paused)),
  setError: message => dispatch(errAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
