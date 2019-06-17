import React from 'react';
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
      file: null, artist: '', title: '', name: '',
    };

    this.uuids = {
      file: uuidv4(), artist: uuidv4(), title: uuidv4(), cover: uuidv4(),
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

  onInput(e) {
    e.preventDefault();

    const { file, artist, title } = this.uuids;

    const { id, value, files } = e.target;
    switch (id) {
      case file: {
        if (files.length === 0) {
          return;
        }

        const { name } = files[0];
        this.setState({ name });

        this.setState({ file: files[0] });
        break;
      }
      case artist:
        this.setState({ artist: value });
        break;
      case title:
        this.setState({ title: value });
        break;
      default:
    }
  }

  onDrop(e) {
    e.preventDefault();

    if (e.dataTransfer.files) {
      const file = e.dataTransfer.files[0];

      this.setState({ file, name: file.name });
    }
  }

  upload(e) {
    e.preventDefault();

    const { token } = this.props;

    const { file, artist, title } = this.state;

    if (file.size > 10 * 1024 * 1024) {
      // Global Error Message
      // File too large. Your audio file may not exceed 10 MB.
    }

    if (file.type !== 'audio/mp3') {
      // Global Error Message
      // Unsupported type. Your audio file has to be in MP3 format.
    }

    fetch(`${REACT_APP_API_URL}/api/songs`, {
      method: 'PUT',
      headers: {
        accept: 'application/vnd.moosik.v1+json',
        'content-type': file.type,
        authorization: `Bearer ${token}`,
        'x-uploaded-filename': artist && title ? `${artist} - ${title}` : file.name,
      },
      body: file,
    })
      .then(res => res.json())
      .then((res) => {
        const { uuid, message } = res;

        if (!uuid) {
          // Global Error Message
          return;
        }

        // Global Message
      })
      .catch((error) => {
        // Global Error Message
      });
  }

  render() {
    const { name } = this.state;

    const { uuids } = this;

    return (
      <section
        className={styles.upload}
        onDrop={this.onDrop.bind(this)}
        onDragOver={e => e.preventDefault()}
      >
        <h1 className={styles.title}>Drag and drop your track here</h1>
        <form className={styles.main}>
          <div className={styles.inputWrapper}>
            <label className={styles.file} htmlFor={uuids.file}>
              <input
                className={styles.fileInput}
                id={uuids.file}
                type="file"
                accept="audio/mpeg"
                onChange={this.onInput.bind(this)}
              />
              <span>or choose file to upload</span>
            </label>
          </div>
          {name && <p className={styles.filename}>{name}</p>}
          <div className={styles.note}>
            <p>Your audio file may not exceed 10 MB and has to be in MP3 format.</p>
          </div>
          <div className={styles.songEdit}>
            <label htmlFor={uuids.artist} className={styles.inputWrapper}>
              <input
                id={uuids.artist}
                className={styles.input}
                type="text"
                placeholder="Artist"
                onChange={this.onInput.bind(this)}
              />
            </label>
            <label htmlFor={uuids.title} className={styles.inputWrapper}>
              <input
                id={uuids.title}
                className={styles.input}
                type="text"
                placeholder="Title"
                onChange={this.onInput.bind(this)}
              />
            </label>
            <label htmlFor={uuids.cover} className={styles.inputWrapper}>
              <input
                id={uuids.cover}
                className={styles.input}
                type="text"
                placeholder="Cover"
                onChange={this.onInput.bind(this)}
              />
            </label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              className={styles.submit}
              type="submit"
              value="Upload"
              onClick={this.upload.bind(this)}
            />
          </div>
        </form>
      </section>
    );
  }
}

Upload.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(withRouter(Upload));
