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

  componentDidMount() {
    this.updateStatus();
    this.interval = setInterval(() => this.updateStatus(), 300000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateStatus() {
    const { setError } = this.props;

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
      .catch((error) => {
        setError(error.toString());
      });
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
