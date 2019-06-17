import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action, { actions } from '../../../../../../actions/player';

import styles from './song.module.css';

import icons from './icons.svg';

class Song extends React.Component {
  onClick() {
    const {
      i, np, setNP, pause, setPause,
    } = this.props;

    if (i === np) {
      setPause(!pause);
      return;
    }

    setNP(i);
  }

  render() {
    const {
      author, title, cover, edit, i, np, pause,
    } = this.props;

    const play = `${icons}#${((i === np) && !pause) ? 'pause' : 'play'}`;

    return (
      <div className={styles.track}>
        <div className={styles.cover} style={{ backgroundImage: `url(${cover})` }}>
          {!cover && (
            <svg className={styles.defaultCover}>
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#cover`} />
            </svg>
          )}
          <button
            className={`${styles.button} ${styles.play}`}
            type="button"
            onClick={this.onClick.bind(this)}
          >
            <svg className={styles.playIcon}>
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={play} />
            </svg>
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.author}>{author}</div>
        </div>
        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.action}`} type="button">
            <svg className={styles.actionIcon}>
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#like`} />
            </svg>
          </button>
          {edit && (
            <button className={`${styles.button} ${styles.action}`} type="button">
              <svg className={styles.actionIcon}>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#edit`} />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
}

Song.defaultProps = {
  cover: null,
  edit: false,
};

Song.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  i: PropTypes.number.isRequired,
  edit: PropTypes.bool,
  np: PropTypes.number.isRequired,
  setNP: PropTypes.func.isRequired,
  pause: PropTypes.bool.isRequired,
  setPause: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  np: store.player.nowPlaying,
  pause: store.player.paused,
});

const mapDispatchToProps = dispatch => ({
  setNP: np => dispatch(action(actions.SET_NOW_PLAYING, np)),
  setPause: paused => dispatch(action(actions.SET_PAUSE, paused)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Song);
