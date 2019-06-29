import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import errAction from '../../../../../../actions/error';

import styles from './songEdit.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.uuids = {
      author: uuidv4(),
      title: uuidv4(),
    };

    this.state = {
      author: '',
      title: '',
    };
  }

  onChange(e) {
    const { author, title } = this.uuids;

    const { id, value } = e.target;

    switch (id) {
      case author:
        this.setState({ author: value });
        break;
      case title:
        this.setState({ title: value });
        break;
      default:
    }
  }

  async update() {
    const { token, uuid, setError } = this.props;

    const { author, title } = this.state;

    const uri = `${REACT_APP_API_URL}/api/songs/${uuid}`;

    const headers = {
      accept: 'application/vnd.moosikapp.v1+json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    };

    const body = {};

    if (author) {
      body.author = encodeURI(author);
    }

    if (title) {
      body.title = encodeURI(title);
    }

    try {
      const { message, song } = await fetch(uri, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body),
      }).then(r => r.json());

      if (!song) {
        setError(message);
        return;
      }

      setError(message);
    } catch (e) {
      setError(e.message);
    }
  }

  render() {
    const { author, title } = this.uuids;

    return (
      <div className={styles.songEdit}>
        <label htmlFor={author} className={styles.inputWrapper}>
          <input
            id={author}
            className={styles.input}
            type="text"
            placeholder="Author"
            onChange={this.onChange.bind(this)}
          />
        </label>
        <label htmlFor={title} className={styles.inputWrapper}>
          <input
            id={title}
            className={styles.input}
            type="text"
            placeholder="Title"
            onChange={this.onChange.bind(this)}
          />
        </label>
        <div className={styles.inputWrapper}>
          <button
            className={styles.submit}
            type="submit"
            onClick={this.update.bind(this)}
          >
            Update
          </button>
        </div>
      </div>
    );
  }
}

Upload.propTypes = {
  token: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  setError: message => dispatch(errAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Upload));
