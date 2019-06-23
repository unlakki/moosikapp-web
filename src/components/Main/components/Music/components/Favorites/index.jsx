import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action, { actions } from '../../../../../../actions/player';
import errAction from '../../../../../../actions/error';
import Song from '../Song';

const { REACT_APP_API_URL = '' } = process.env;

class Favorites extends React.Component {
  async componentDidMount() {
    const { token, setSongs, setError } = this.props;

    const uri = `${REACT_APP_API_URL}/api/favorites`;

    const headers = {
      accept: 'application/vnd.moosik.v1+json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    };

    const { message, songs } = await fetch(uri, {
      method: 'GET',
      headers,
    }).then(r => r.json());

    if (!songs) {
      setError(message);
      return;
    }

    setSongs(songs);
  }

  render() {
    const { songs } = this.props;

    return (
      <>
        {songs.map((song, i) => (
          <Song
            key={song.uuid}
            author={song.author}
            title={song.title}
            cover={song.cover}
            i={i}
          />
        ))}
      </>
    );
  }
}

Favorites.propTypes = {
  token: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
  })).isRequired,
  setSongs: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  songs: store.player.songs,
});

const mapDispatchToProps = dispatch => ({
  setSongs: songs => dispatch(action(actions.SET_SONGS, songs)),
  setError: message => dispatch(errAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
