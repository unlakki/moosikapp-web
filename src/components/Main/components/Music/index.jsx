import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action, { actions } from '../../../../actions/player';
import Song from './components/Song';

import styles from './music.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Music extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  componentDidMount() {
    const { token, setSongs } = this.props;

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
          this.setState({ error: message });
          return;
        }

        setSongs(songs);
      })
      .catch(error => this.setState({ error: error.toString() }));
  }

  render() {
    const { songs } = this.props;
    const { error } = this.state;

    return (
      <section className={styles.music}>
        <h1 className={styles.head}>All Music</h1>
        <div className={styles.songList}>
          {songs.map((song, index) => (
            <Song
              key={song.uuid}
              author={song.author}
              title={song.title}
              cover={song.cover}
              index={index}
            />
          ))}
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </section>
    );
  }
}

Music.propTypes = {
  token: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  setSongs: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  songs: store.player.songs,
});

const mapDispatchToProps = dispatch => ({
  setSongs: songs => dispatch(action(actions.SET_SONGS, songs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Music);
