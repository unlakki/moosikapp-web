import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import FileUploader from './FileUploader';

import styles from './layouts/Upload.module.css';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drag: false,
      files: [],
    };

    this.uuids = {
      input: uuidv4(),
    };
  }

  uploadFiles(f) {
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

      this.setState(({ files }) => ({
        drag: false,
        files: files.concat(f),
      }));
    } catch (e) {
      // error message
    }
  }

  render() {
    const { drag, files } = this.state;
    const { input } = this.uuids;

    return (
      <div className={styles.container}>
        <div
          className={`${styles.form}${drag ? ` ${styles.drop}` : ''}`}
          onDrop={(e) => {
            e.preventDefault();
            const f = Object.values(e.dataTransfer.files);
            this.uploadFiles(f);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            this.setState({ drag: true });
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            this.setState({ drag: false });
          }}
        >
          <h1 className={styles.title}>Drag and drop your tracks here</h1>
          <label htmlFor={input} className={styles.file}>
            <input
              id={input}
              className={styles.input}
              type="file"
              accept="audio/mpeg"
              multiple
              onChange={(e) => {
                const f = Object.values(e.target.files);
                console.log(f[0]);
                this.uploadFiles(f);
              }}
            />
            <span>or choose files to upload</span>
          </label>
          <div className={styles.note}>
            <p>Your audio file may not exceed 10 MB and has to be in MP3 format.</p>
          </div>
        </div>
        {(files && files.length > 0) && (
          <div className={styles.files}>
            {Object.values(files).map(file => (
              <FileUploader key={uuidv4()} file={file} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Upload;
