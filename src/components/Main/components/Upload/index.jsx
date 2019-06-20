import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import errAction from '../../../../actions/error';

import styles from './upload.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.uuids = {
      file: uuidv4(),
    };

    this.state = {
      name: '',
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

    this.setState({ name: file.name });
    this.upload(file);
  }

  onDrop(e) {
    if (e.dataTransfer.files) {
      const file = e.dataTransfer.files[0];

      this.setState({ name: file.name });
      this.upload(file);
    }
  }

  async upload(file) {
    const { token, setError } = this.props;

    if (file.size > 10 * 1024 * 1024) {
      setError('File too large. Your audio file may not exceed 10 MB.');
      return;
    }

    if (file.type !== 'audio/mp3') {
      setError('Unsupported type. Your audio file has to be in MP3 format.');
      return;
    }

    const uri = `${REACT_APP_API_URL}/api/songs`;

    const headers = {
      accept: 'application/vnd.moosik.v1+json',
      'content-type': 'audio/mpeg',
      authorization: `Bearer ${token}`,
      'x-uploaded-filename': encodeURI(file.name),
    };

    try {
      const { message, uuid } = await fetch(uri, {
        method: 'PUT',
        headers,
        body: file,
      }).then(r => r.json());

      if (!uuid) {
        throw new Error(message);
      }

      setError(message); // Temporary error
    } catch (error) {
      setError(error.message);
    }
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
                onChange={this.onChange.bind(this)}
              />
              <span>or choose file to upload</span>
            </label>
          </div>
          {name && <p className={styles.filename}>{name}</p>}
          <div className={styles.note}>
            <p>Your audio file may not exceed 10 MB and has to be in MP3 format.</p>
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
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  setError: message => dispatch(errAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Upload));
