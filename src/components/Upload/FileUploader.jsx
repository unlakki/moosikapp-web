import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import styles from './layouts/FileUploader.module.css';
import inputStyles from '../../layouts/Input.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class FileUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      modify: false,
    };
  }

  async componentDidMount() {
    const { file } = this.props;
    await this.uploadFile(file);
  }

  async uploadFile(file) {
    const { token } = this.props;

    try {
      const res = await axios(`${REACT_APP_API_URL}/api/songs`, {
        method: 'POST',
        headers: {
          accept: 'application/vnd.moosikapp.v1+json',
          'content-type': 'audio/mpeg',
          authorization: `Bearer ${token}`,
        },
        data: file,
        onUploadProgress: ({ loaded, total }) => {
          this.setState({ progress: loaded / total });
        },
      }).then(r => r.data);

      console.log(res);
      this.setState({ modify: true });
    } catch (e) {
      // error message
      console.error(e);
    }
  }

  render() {
    const { progress, modify } = this.state;
    const { file } = this.props;

    return (
      <div className={styles.upload}>
        <div className={styles.filename}>
          <span>{file.name}</span>
        </div>
        <div className={styles.body}>
          <div className={styles.progress}>
            <div className={styles.passed} style={{ width: `${progress * 100}%` }} />
          </div>
          {modify && (
            <div className={styles.basicInfo}>
              <div
                className={styles.image}
                // style={{ backgroundImage: 'url(https://cdn.moosikapp.tk/v1/15ba5da8a27ee9565c2c9636bad4d994/azunyan.jpg)' }}
              >
                <div className={styles.hover} />
                <label htmlFor="image" className={styles.picker}>
                  <span>Choose image</span>
                  <input id="image" className={styles.input} type="file" accept="image/*" />
                </label>
              </div>
              <div className={styles.titleAndAuthor}>
                <label htmlFor="author" className={styles.label}>
                  <span>Author:</span>
                  <input id="author" className={inputStyles.input} type="text" />
                </label>
                <label htmlFor="title" className={styles.label}>
                  <span>Title:</span>
                  <input id="title" className={inputStyles.input} type="text" />
                </label>
                <div className={styles.save}>
                  <button className={inputStyles.button} type="button">Save</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

FileUploader.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    lastModified: PropTypes.number,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(FileUploader);
