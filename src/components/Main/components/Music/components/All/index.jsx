import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action, { actions } from '../../../../../../actions/player';
import errAction from '../../../../../../actions/error';
import Song from '../Song';

const { REACT_APP_API_URL = '' } = process.env;

class All extends React.Component {
  async componentDidMount() {
    const { token, setSongs, setError } = this.props;

    const uri = `${REACT_APP_API_URL}/api/songs`;

    const headers = {
      accept: 'application/vnd.moosikapp.v1+json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    };

    try {
      const { message, songs } = await fetch(uri, {
        method: 'GET',
        headers,
      }).then(r => r.json());

      if (!songs) {
        throw new Error(message);
      }

      setSongs(songs);
    } catch (e) {
      setError(e.message);
    }
  }

  render() {
    const { songs } = this.props;

    return (
      <>
        {songs.map((song, i) => (
          <Song
            key={song.uuid}
            uuid={song.uuid}
            author={song.author}
            title={song.title}
            cover={song.cover}
            favorite={song.favorite}
            index={i}
          />
        ))}
      </>
    );
  }
}

All.propTypes = {
  token: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
    favorite: PropTypes.bool,
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

export default connect(mapStateToProps, mapDispatchToProps)(All);
