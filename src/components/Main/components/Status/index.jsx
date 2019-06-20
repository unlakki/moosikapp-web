import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filesize from 'filesize';
import errAction from '../../../../actions/error';

import styles from './status.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Status extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storage: null,
    };
  }

  async componentDidMount() {
    await this.updateStatus();
    this.interval = setInterval(async () => {
      await this.updateStatus();
    }, 300000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async updateStatus() {
    const { setError } = this.props;

    const uri = `${REACT_APP_API_URL}/api/status`;

    const headers = {
      accept: 'application/vnd.moosik.v1+json',
      'content-type': 'application/json',
    };

    try {
      const { message, storage } = await fetch(uri, {
        method: 'GET',
        headers,
      }).then(r => r.json());

      if (!storage) {
        throw new Error(message);
      }

      this.setState({ storage });
    } catch (e) {
      setError(e.message);
    }
  }

  render() {
    const { storage } = this.state;

    return (
      <section className={styles.status}>
        <h1 className={styles.title}>Storage Status</h1>
        {storage && (
          <div className={styles.body}>
            <p className={styles.item}>
              Total Space:&ensp;
              <span>{filesize(storage.totalSpace)}</span>
            </p>
            <p className={styles.item}>
              Used Space:&ensp;
              <span>{filesize(storage.usedSpace)}</span>
            </p>
            <p className={styles.item}>
              Max File Size:&ensp;
              <span>{filesize(storage.maxFileSize)}</span>
            </p>
          </div>
        )}
      </section>
    );
  }
}

Status.propTypes = {
  setError: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setError: message => dispatch(errAction(message)),
});

export default connect(null, mapDispatchToProps)(Status);
