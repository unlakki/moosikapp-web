import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action from './actions/login';

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
  }

  login() {
    const { setToken } = this.props;

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
      .then(r => r.json())
      .then((res) => {
        const { token, message } = res;

        if (!token) {
          this.setState({ error: message });
          return;
        }

        setToken(res.token);
      })
      .catch((e) => {
        this.setState({ error: e.toString() });
      });
  }

  render() {
    const { token } = this.props;
    const { error } = this.state;

    if (token) {
      return (
        <h1>Already logged in.</h1>
      );
    }

    return (
      <section className={styles.status}>
        <h1 className={styles.head}>Login</h1>
        <div className={styles.body}>
          <input ref={this.username} type="text" />
          <input ref={this.password} type="password" />
          <input type="submit" onClick={this.login.bind(this)} />
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </section>
    );
  }
}

Login.propTypes = {
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(action(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
