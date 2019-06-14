import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import styles from './upload.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null, error: null,
    };

    this.file = createRef();
    this.songArtist = createRef();
    this.songName = createRef();

    this.uuids = {
      file: uuidv4(), songArtist: uuidv4(), songName: uuidv4(),
    };
  }

  componentDidMount() {
    const { token, history } = this.props;

    if (!token) {
      history.push('/');
      return false;
    }

    return true;
  }

  upload(e) {
    e.preventDefault();

    const { token } = this.props;

    const username = this.username.current.value;
    const password = this.password.current.value;

    fetch(`${REACT_APP_API_URL}/api/songs`, {
      method: 'PUT',
      headers: {
        accept: 'application/vnd.moosik.v1+json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then((res) => {
        const { uuid, message } = res;

        if (!uuid) {
          this.setState({ error: message });
          return;
        }

        this.setState({ error: message });
      })
      .catch(error => this.setState({ error: error.toString() }));
  }

  choose(e) {
    e.preventDefault();

    const file = e.target.files[0].name;

    this.setState({ file });
  }

  render() {
    const { file, error } = this.state;

    const { uuids } = this;

    return (
      <section className={styles.upload}>
        <h1 className={styles.head}>Upload</h1>
        <div className={styles.instruction}>
          <p>Your audio file may not exceed 10 MB and has to be in MP3 format.</p>
        </div>
        <form className={styles.body}>
          <div className={styles.field}>
            {file && <span className={styles.selectedFile}>{file}</span>}
            <label className={styles.fileInput} htmlFor={uuids.file}>
              <input ref={this.file} id={uuids.file} type="file" onChange={this.choose.bind(this)} />
              <span>Choose File</span>
            </label>
          </div>
          <div className={styles.additionalInfo}>
            <h3 className={styles.title}>Additional Information</h3>
            <label htmlFor={uuids.songArtist} className={styles.field}>
              <input
                ref={this.songArtist}
                id={uuids.songArtist}
                className={styles.textInput}
                type="text"
                placeholder="Artist (Optional)"
              />
            </label>
            <label htmlFor={uuids.songName} className={styles.field}>
              <input
                ref={this.songName}
                id={uuids.songName}
                className={styles.textInput}
                type="text"
                placeholder="Name (Optional)"
              />
            </label>
          </div>
          <div className={styles.field}>
            <input
              className={styles.submitButton}
              type="submit"
              value="Upload"
              onClick={this.upload.bind(this)}
            />
          </div>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </section>
    );
  }
}

Upload.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
});

export default connect(mapStateToProps)(withRouter(Upload));
