import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import BasicSongInfo from './BasicSongInfo';

import styles from './layouts/FileUploader.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class FileUploader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      uuid: '',
    };
  }

  async componentDidMount() {
    const { file } = this.props;
    await this.uploadFile(file);
  }

  async uploadFile(file) {
    const { token } = this.props;

    try {
      const { uuid } = await axios(`${REACT_APP_API_URL}/api/songs`, {
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

      this.setState({ uuid });
    } catch (e) {
      // error message
      console.error(e);
    }
  }

  render() {
    const { progress, uuid } = this.state;
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
          {uuid && <BasicSongInfo uuid={uuid} />}
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
