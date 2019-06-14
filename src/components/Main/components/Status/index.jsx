import React from 'react';
import filesize from 'filesize';

import styles from './status.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Status extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storage: null, error: null,
    };
  }

  componentDidMount() {
    this.updateStatus();
    this.interval = setInterval(() => this.updateStatus(), 300000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateStatus() {
    fetch(`${REACT_APP_API_URL}/api/status`, {
      method: 'GET',
      headers: {
        accept: 'application/vnd.moosik.v1+json',
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        const { storage } = res;

        this.setState({ storage });
      })
      .catch(error => this.setState({ error: error.toString() }));
  }

  render() {
    const { storage, error } = this.state;

    return (
      <section className={styles.status}>
        <h1 className={styles.head}>Storage Status</h1>
        {storage && (
          <div className={styles.body}>
            <p className={styles.prop}>
              Total Space:&ensp;
              <span>{filesize(storage.totalSpace)}</span>
            </p>
            <p className={styles.prop}>
              Used Space:&ensp;
              <span>{filesize(storage.usedSpace)}</span>
            </p>
            <p className={styles.prop}>
              Max File Size:&ensp;
              <span>{filesize(storage.maxFileSize)}</span>
            </p>
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </section>
    );
  }
}

export default Status;
