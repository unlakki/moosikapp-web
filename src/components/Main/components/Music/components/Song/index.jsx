import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action, { actions } from '../../../../../../actions/player';
import errAction from '../../../../../../actions/error';

import styles from './song.module.css';

import icons from './icons.svg';

const { REACT_APP_API_URL = '' } = process.env;

class Song extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: props.favorite,
    };
  }

  onPlayClick() {
    const {
      index, np, setNP, pause, setPause,
    } = this.props;

    if (index === np) {
      setPause(!pause);
      return;
    }

    setNP(index);
  }

  async onLikeClick() {
    const { favorite } = this.state;

    if (favorite) {
      await this.deleteFromFavorite();
      return;
    }

    await this.addToFavorite();
  }

  async addToFavorite() {
    const { uuid, token, setError } = this.props;

    const uri = `${REACT_APP_API_URL}/api/favorites/${uuid}`;

    const headers = {
      accept: 'application/vnd.moosikapp.v1+json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    };

    try {
      const { message } = await fetch(uri, {
        method: 'POST',
        headers,
      }).then(r => r.json());

      this.setState({ favorite: true });
      setError(message);
    } catch (e) {
      setError(e.message);
    }
  }

  async deleteFromFavorite() {
    const { uuid, token, setError } = this.props;

    const uri = `${REACT_APP_API_URL}/api/favorites/${uuid}`;

    const headers = {
      accept: 'application/vnd.moosikapp.v1+json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    };

    try {
      const { status } = await fetch(uri, {
        method: 'DELETE',
        headers,
      });

      if (status !== 204) {
        throw new Error('Unexpected error.');
      }

      this.setState({ favorite: false });
      setError('Successfully removed song from favorites.');
    } catch (e) {
      setError(e.message);
    }
  }

  render() {
    const {
      author, title, cover, edit, index, np, pause,
    } = this.props;

    const { favorite } = this.state;

    const play = `${icons}#${((index === np) && !pause) ? 'pause' : 'play'}`;

    return (
      <div className={styles.track}>
        <div className={styles.cover} style={{ backgroundImage: cover ? `url(${cover})` : '' }}>
          {!cover && (
            <svg className={styles.defaultCover}>
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#cover`} />
            </svg>
          )}
          <button
            className={`${styles.button} ${styles.play}`}
            type="button"
            onClick={this.onPlayClick.bind(this)}
          >
            <svg className={styles.icon}>
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={play} />
            </svg>
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.author}>{author}</div>
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.button}
            ${styles.action}`}
            type="button"
            onClick={this.onLikeClick.bind(this)}
          >
            <svg className={styles.icon} style={{ fill: favorite ? 'var(--red)' : '' }}>
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${icons}#like`} />
            </svg>
          </button>
          {edit && (
            <button className={`${styles.button} ${styles.action}`} type="button">
              <svg className={styles.icon}>
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
  favorite: true,
};

Song.propTypes = {
  token: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  favorite: PropTypes.bool,
  index: PropTypes.number.isRequired,
  edit: PropTypes.bool,
  np: PropTypes.number.isRequired,
  setNP: PropTypes.func.isRequired,
  pause: PropTypes.bool.isRequired,
  setPause: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  np: store.player.nowPlaying,
  pause: store.player.paused,
});

const mapDispatchToProps = dispatch => ({
  setNP: np => dispatch(action(actions.SET_NOW_PLAYING, np)),
  setPause: paused => dispatch(action(actions.SET_PAUSE, paused)),
  setError: message => dispatch(errAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Song);
