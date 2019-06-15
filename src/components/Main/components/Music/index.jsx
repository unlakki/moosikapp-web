import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Song from './components/Song';

import styles from './music.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Music extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [], error: null,
    };
  }

  componentDidMount() {
    const { token } = this.props;

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

        this.setState({ songs });
      })
      .catch(error => this.setState({ error: error.toString() }));
  }

  render() {
    const { songs, error } = this.state;

    return (
      <section className={styles.music}>
        <h1 className={styles.head}>All Music</h1>
        <div>
          {songs.map(song => (
            <Song key={song.uuid} author={song.author} title={song.title} />
          ))}
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </section>
    );
  }
}

Music.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(Music);
