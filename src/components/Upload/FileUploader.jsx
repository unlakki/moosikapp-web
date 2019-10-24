import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SongInfoEditor from './SongInfoEditor';
import { uploadSong } from '../../utils/requests';

import css from './css/FileUploader.module.css';

const FileUploader = ({ token, file }) => {
  const [uuid, setUuid] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const func = async () => {
      try {
        const res = await uploadSong(token, file, ({ loaded, total }) => {
          setProgress(loaded / total);
        });

        setUuid(res.uuid);
      } catch (e) {
        // console.error(e);
      }
    };

    func();
  }, [file]);

  return (
    <div className={css.fileUploader}>
      <div className={css.filename}>
        <span>{file.name}</span>
      </div>
      <div>
        <div className={css.progressBar}>
          <div className={css.passed} style={{ width: `${progress * 100}%` }} />
        </div>
        {uuid && <SongInfoEditor uuid={uuid} />}
      </div>
    </div>
  );
};

FileUploader.propTypes = {
  token: PropTypes.string.isRequired,
  file: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    lastModified: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(FileUploader);
