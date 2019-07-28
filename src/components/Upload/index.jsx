import React from 'react';
import FileUploader from './FileUploader';

import styles from './layouts/Upload.module.css';

const Upload = () => (
  <div className={styles.container}>
    <div className={`${styles.form} ${styles.drop}`}>
      <h1 className={styles.title}>Drag and drop your tracks here</h1>
      <label htmlFor="file" className={styles.file}>
        <input id="file" className={styles.input} type="file" accept="audio/mpeg" />
        <span>or choose files to upload</span>
      </label>
      <div className={styles.note}>
        <p>Your audio file may not exceed 10 MB and has to be in MP3 format.</p>
      </div>
    </div>
    <div className={styles.files}>
      <FileUploader file="filename.mp3" />
    </div>
  </div>
);

export default Upload;
