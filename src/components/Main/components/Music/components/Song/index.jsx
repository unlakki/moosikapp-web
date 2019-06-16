import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action, { actions } from '../../../../../../actions/player';

import styles from './song.module.css';

import icons from './icons.svg';

class Song extends React.Component {
  click() {
    const {
      index, nowPlaying, setNowPlaying, paused, setPause,
    } = this.props;

    if (index !== nowPlaying) {
      setNowPlaying(index);
      return;
    }

    setPause(!paused);
  }

  render() {
    const {
      author, title, cover, editable, index, nowPlaying, paused,
    } = this.props;

    const playing = (index === nowPlaying) && !paused;

    return (
      <div className={styles.song}>
        <div
          className={styles.cover}
          style={{ backgroundImage: `url(${cover})` }}
          role="presentation"
          onClick={this.click.bind(this)}
        >
          {!cover && (
            <svg className={styles.defaultCover}>
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#defaultCover`} />
            </svg>
          )}
          <svg className={styles.play}>
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref={`${icons}#${playing ? 'pause' : 'play'}`}
            />
          </svg>
        </div>
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.title}>{title}</div>
            <div className={styles.author}>{author}</div>
          </div>
          <div className={styles.actions}>
            <svg className={styles.button}>
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref={`${icons}#${true ? 'select' : 'deselect'}`}
              />
            </svg>
            {editable && (
              <svg className={styles.button}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#edit`} />
              </svg>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Song.defaultProps = {
  cover: null,
  editable: false,
};

Song.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  index: PropTypes.number.isRequired,
  editable: PropTypes.bool,
  nowPlaying: PropTypes.number.isRequired,
  setNowPlaying: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
  setPause: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  nowPlaying: store.player.nowPlaying,
  paused: store.player.paused,
});

const mapDispatchToProps = dispatch => ({
  setNowPlaying: nowPlaying => dispatch(action(actions.SET_NOW_PLAYING, nowPlaying)),
  setPause: paused => dispatch(action(actions.SET_PAUSE, paused)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Song);
