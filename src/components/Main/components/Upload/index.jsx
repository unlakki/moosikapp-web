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
      file: null, artist: null, title: null, fileName: null, error: null,
    };

    this.uuids = {
      file: uuidv4(), artist: uuidv4(), title: uuidv4(),
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

    const { file, artist, title } = this.state;

    fetch(`${REACT_APP_API_URL}/api/songs`, {
      method: 'PUT',
      headers: {
        accept: 'application/vnd.moosik.v1+json',
        'content-type': 'audio/mpeg',
        authorization: `Bearer ${token}`,
        'x-uploaded-filename': artist && title ? `${artist} - ${title}` : file.name,
      },
      body: file,
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

  input(e) {
    e.preventDefault();

    const { file, artist, title } = this.uuids;

    const { id, value, files } = e.target;
    switch (id) {
      case file: {
        const { name } = files[0];
        this.setState({ fileName: name });

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

  render() {
    const { fileName, error } = this.state;

    const { uuids } = this;

    return (
      <section className={styles.upload}>
        <h1 className={styles.head}>Upload</h1>
        <div className={styles.instruction}>
          <p>Your audio file may not exceed 10 MB and has to be in MP3 format.</p>
        </div>
        <form className={styles.body}>
          <div className={styles.field}>
            {fileName && <span className={styles.selectedFile}>{fileName}</span>}
            <label className={styles.fileInput} htmlFor={uuids.file}>
              <input
                ref={this.file}
                id={uuids.file}
                type="file"
                accept="audio/mpeg"
                onChange={this.input.bind(this)}
              />
              <span>Choose File</span>
            </label>
          </div>
          <div className={styles.additionalInfo}>
            <h3 className={styles.title}>Additional Information</h3>
            <label htmlFor={uuids.artist} className={styles.field}>
              <input
                ref={this.artist}
                id={uuids.artist}
                className={styles.textInput}
                type="text"
                placeholder="Artist (Optional)"
                onChange={this.input.bind(this)}
              />
            </label>
            <label htmlFor={uuids.title} className={styles.field}>
              <input
                ref={this.title}
                id={uuids.title}
                className={styles.textInput}
                type="text"
                placeholder="Name (Optional)"
                onChange={this.input.bind(this)}
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(withRouter(Upload));
