import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import errAction from '../../../../actions/error';

import styles from './forgot.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Forgot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
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

  onInput(e) {
    e.preventDefault();

    this.setState({ email: e.target.value });
  }

  requestPasswordChange(e) {
    e.preventDefault();

    const { setError } = this.props;

    const { email } = this.state;

    if (!/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(email)) {
      setError('Invalid email.');
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
        setError(res.message);
      })
      .catch((error) => {
        setError(error.toString());
      });
  }

  render() {
    const { uuids } = this;

    return (
      <section className={styles.forgot}>
        <h1 className={styles.title}>Forgot</h1>
        <form className={styles.main}>
          <div className={styles.note}>
            <p>To request a new password please enter your account email in the box below.</p>
            <p>We will send you an email with further instructions.</p>
          </div>
          <label htmlFor={uuids.email} className={styles.inputWrapper}>
            <input
              ref={this.email}
              id={uuids.email}
              className={styles.input}
              type="email"
              placeholder="Email"
              onChange={this.onInput.bind(this)}
            />
          </label>
          <div className={styles.inputWrapper}>
            <input
              className={styles.submit}
              type="submit"
              value="Request Password Change"
              onClick={this.requestPasswordChange.bind(this)}
            />
          </div>
        </form>
      </section>
    );
  }
}

Forgot.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  setError: message => dispatch(errAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Forgot));
