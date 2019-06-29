import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import errAction from '../../../../actions/error';
import SongEdit from './components/SongEdit';

import styles from './upload.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.uuids = {
      file: uuidv4(),
    };

    this.state = {
      fileName: '',
      progress: 0,
      dragOver: false,
      songUuid: '',
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

  onChange(e) {
    const file = e.target.files[0];

    this.setState({ fileName: file.name });
    this.upload(file);
  }

  onDrop(e) {
    e.preventDefault();

    if (e.dataTransfer.files) {
      const file = e.dataTransfer.files[0];

      this.setState({ fileName: file.name, dragOver: false });
      this.upload(file);
    }
  }

  onDragOver(e) {
    e.preventDefault();

    this.setState({ dragOver: true });
  }

  onDragLeave(e) {
    e.preventDefault();

    this.setState({ dragOver: false });
  }

  upload(file) {
    const { token, setError } = this.props;

    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Your audio file may not exceed 10 MB.');
      return;
    }

    if (file.type !== 'audio/mp3') {
      setError('Unsupported type. Your audio file has to be in MP3 format.');
      return;
    }

    const xhr = new XMLHttpRequest();

    xhr.open('POST', `${REACT_APP_API_URL}/api/songs`);

    xhr.setRequestHeader('accept', 'application/vnd.moosikapp.v1+json');
    xhr.setRequestHeader('content-type', 'audio/mpeg');
    xhr.setRequestHeader('authorization', `Bearer ${token}`);

    xhr.onload = () => {
      const { message, uuid } = JSON.parse(xhr.response);

      if (xhr.status === 201) {
        this.setState({ songUuid: uuid });
        return;
      }

      setError(message);
    };

    xhr.onerror = () => setError('Error while uploading.');

    xhr.upload.onprogress = (e) => {
      const { loaded, total, type } = e;

      if (type === 'error') {
        setError('error');
        return;
      }

      this.setState({ progress: loaded / total });
    };
    xhr.send(file);
  }

  render() {
    const {
      fileName, songUuid, dragOver, progress,
    } = this.state;

    const { file } = this.uuids;

    return (
      <section
        className={`${styles.container} ${dragOver ? styles.dragOver : ''}`}
        onDrop={this.onDrop.bind(this)}
        onDragOver={this.onDragOver.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar} style={{ width: `${progress * 100}%` }} />
        </div>
        <h1 className={styles.title}>Drag and drop your track here</h1>
        <div className={styles.uploader}>
          <label className={styles.file} htmlFor={file}>
            <input
              className={styles.fileInput}
              id={file}
              type="file"
              accept="audio/mpeg"
              onChange={this.onChange.bind(this)}
            />
            <span>or choose file to upload</span>
          </label>
          {fileName && <p className={styles.fileName}>{fileName}</p>}
          <div className={styles.note}>
            <p>Your audio file may not exceed 10 MB and has to be in MP3 format.</p>
          </div>
        </div>
        {progress === 1 && songUuid && <SongEdit uuid={songUuid} />}
      </section>
    );
  }
}

Upload.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  setError: message => dispatch(errAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Upload));
