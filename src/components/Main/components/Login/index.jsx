import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';
import action from '../../../../actions/login';

import styles from './login.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.username = createRef();
    this.password = createRef();

    this.uuids = {
      username: uuid(),
      password: uuid(),
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

  login(e) {
    e.preventDefault();

    const { setToken, history } = this.props;

    const username = this.username.current.value;
    const password = this.password.current.value;

    fetch(`${REACT_APP_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        accept: 'application/vnd.moosik.v1+json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then((res) => {
        const { token, message } = res;

        if (!token) {
          this.setState({ error: message });
          return;
        }

        setToken(token);
        window.localStorage.setItem('token', token);
        history.push('/');
      })
      .catch(error => this.setState({ error: error.toString() }));
  }

  reset() {
    this.setState({ error: null });
  }

  render() {
    const { error } = this.state;

    const { uuids } = this;

    return (
      <section className={styles.login}>
        <h1 className={styles.head}>Login</h1>
        <form className={styles.body}>
          <label htmlFor={uuids.username} className={styles.field}>
            <input
              ref={this.username}
              id={uuids.username}
              className={styles.textInput}
              type="text"
              placeholder="Username / Email"
              onClick={this.reset.bind(this)}
            />
          </label>
          <label htmlFor={uuids.password} className={styles.field}>
            <input
              ref={this.password}
              id={uuids.password}
              className={styles.textInput}
              type="password"
              placeholder="Password"
              onClick={this.reset.bind(this)}
            />
          </label>
          <div className={styles.field}>
            <input
              className={styles.submitButton}
              type="submit"
              value="Login"
              onClick={this.login.bind(this)}
            />
          </div>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </section>
    );
  }
}

Login.propTypes = {
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(action(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
