import React from 'react';
import PropTypes from 'prop-types';

import styles from './layouts/FileUploader.module.css';
import inputStyles from '../../layouts/Input.module.css';

const FileUploader = ({ file }) => (
  <div className={styles.upload}>
    <div className={styles.filename}>
      <span>{file}</span>
    </div>
    <div className={styles.body}>
      <div className={styles.progress}>
        <div className={styles.passed} style={{ width: '10%' }} />
      </div>
      <div className={styles.basicInfo}>
        <div
          className={styles.image}
          style={{ backgroundImage: 'url(https://cdn.moosikapp.tk/v1/15ba5da8a27ee9565c2c9636bad4d994/azunyan.jpg)' }}
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
    </div>
  </div>
);

FileUploader.propTypes = {
  file: PropTypes.string.isRequired,
};

export default FileUploader;
