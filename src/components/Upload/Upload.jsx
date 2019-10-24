import React, { useState } from 'react';
import uuidv4 from 'uuid/v4';
import classnames from 'classnames';
import FileUploader from './FileUploader';

import css from './css/Upload.module.css';

const Upload = () => {
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState([]);

  const uuids = {
    input: uuidv4(),
  };

  const prepare = (event) => {
    try {
      const fileList = Object.values(event.target.files || event.dataTransfer.files);

      fileList.map(({ type, size }) => {
        if (type !== 'audio/mp3') {
          throw new Error('Unsupported file type.');
        }

        if (size > 10 * 1024 * 1024) {
          throw new Error('File too large.');
        }

        return true;
      });

      setFiles(fileList);
    } catch (e) {
      // console.error(e);
    }
  };

  return (
    <div className={css.container}>
      {files && files.length > 0 ? (
        <div className={css.fileList}>
          {files.map(file => (
            <FileUploader key={uuidv4()} file={file} />
          ))}
        </div>
      ) : (
        <div
          className={classnames(css.uploadForm, { [css.drop]: drag })}
          onDrop={(e) => {
            e.preventDefault();
            prepare(e);
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
          <h1 className={css.caption}>Drag and drop your tracks here</h1>
          <label htmlFor={uuids.input} className={css.uploadButton}>
            <span>or choose files to upload</span>
            <input
              id={uuids.input}
              className={css.input}
              type="file"
              accept="audio/mpeg"
              multiple
              onChange={prepare}
            />
          </label>
          <div className={css.note}>
            <p>Your audio file may not exceed 10 MB and has to be in MP3 format.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
