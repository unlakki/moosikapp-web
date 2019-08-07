import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';
import FileUploader from './FileUploader';

import styles from './layouts/Upload.module.css';

const Upload = () => {
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState([]);

  const uuids = {
    input: uuidv4(),
  };

  async function upload(f) {
    try {
      f.map(({ type, size }) => {
        if (type !== 'audio/mp3') {
          throw new Error('Unsupported file type.');
        }

        if (size > 10 * 1024 * 1024) {
          throw new Error('File too large.');
        }

        return true;
      });

      setFiles(files.concat(f));
    } catch (e) {
      // error message
      console.error(e);
    }
  }

  return (
    <div className={styles.container}>
      {(files.length === 0) && (
        <div
          className={`${styles.form}${drag ? ` ${styles.drop}` : ''}`}
          onDrop={(e) => {
            e.preventDefault();
            upload(Object.values(e.dataTransfer.files));
            setDrag(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDrag(false);
          }}
        >
          <h1 className={styles.title}>Drag and drop your tracks here</h1>
          <label htmlFor={uuids.input} className={styles.file}>
            <input
              id={uuids.input}
              className={styles.input}
              type="file"
              accept="audio/mpeg"
              multiple
              onChange={(e) => {
                upload(Object.values(e.target.files));
              }}
            />
            <span>or choose files to upload</span>
          </label>
          <div className={styles.note}>
            <p>Your audio file may not exceed 10 MB and has to be in MP3 format.</p>
          </div>
        </div>
      )}
      {(files && files.length > 0) && (
        <div className={styles.files}>
          {Object.values(files).map(file => (
            <FileUploader key={uuidv4()} file={file} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Upload;
