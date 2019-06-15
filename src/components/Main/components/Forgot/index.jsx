import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import styles from './forgot.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Forgot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null, error: null,
    };

    this.uuids = {
      email: uuidv4(),
    };
  }

  componentDidMount() {
    const { token, history } = this.props;

    if (token) {
      history.push('/');
      return false;
    }

    return true;
  }

  requestPasswordChange(e) {
    e.preventDefault();

    const { email } = this.state;

    if (!/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(email)) {
      this.setState({ error: 'Invalid email.' });
      return;
    }

    fetch(`${REACT_APP_API_URL}/api/forgot`, {
      method: 'POST',
      headers: {
        accept: 'application/vnd.moosik.v1+json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then((res) => {
        this.setState({ error: res.message });
      })
      .catch(error => this.setState({ error: error.toString() }));
  }

  input(e) {
    e.preventDefault();

    this.setState({ email: e.target.value });
  }

  reset() {
    this.setState({ error: null });
  }

  render() {
    const { error } = this.state;

    const { uuids } = this;

    return (
      <section className={styles.forgot}>
        <h1 className={styles.head}>Forgot</h1>
        <form className={styles.body}>
          <div className={styles.instruction}>
            <p>To request a new password please enter your account email in the box below.</p>
            <p>We will send you an email with further instructions.</p>
          </div>
          <label htmlFor={uuids.email} className={styles.field}>
            <input
              ref={this.email}
              id={uuids.email}
              className={styles.textInput}
              type="email"
              placeholder="Email"
              onChange={this.input.bind(this)}
              onClick={this.reset.bind(this)}
            />
          </label>
          <div className={styles.field}>
            <input
              className={styles.submitButton}
              type="submit"
              value="Request Password Change"
              onClick={this.requestPasswordChange.bind(this)}
            />
          </div>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </section>
    );
  }
}

Forgot.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(withRouter(Forgot));
