import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login as loginAction } from '../../actions/login';

import styles from './layouts/Login.module.css';
import inputStyles from '../../layouts/Input.module.css';
import linkStyles from '../../layouts/Link.module.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    const { token, history } = this.props;

    if (token) {
      history.push('/');
    }
  }

  componentDidUpdate() {
    const { token, history } = this.props;

    if (token) {
      history.push('/');
    }
  }

  render() {
    const { username, password } = this.state;
    const { login } = this.props;

    return (
      <div className={styles.login}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.main}>
          <label htmlFor="username" className={styles.inputWrapper}>
            <input
              id="username"
              className={inputStyles.input}
              type="text"
              placeholder="Username / Email"
              autoComplete="off"
              onChange={e => this.setState({ username: e.target.value })}
            />
          </label>
          <label htmlFor="password" className={styles.inputWrapper}>
            <input
              id="password"
              className={inputStyles.input}
              type="password"
              placeholder="Password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </label>
          <div className={styles.footer}>
            <Link className={linkStyles.link} to="/forgot">Forgot your password?</Link>
            <div>
              <Link className={`${linkStyles.link} ${styles.marginRight}`} to="/register">Need an account?</Link>
              <input
                className={inputStyles.button}
                type="submit"
                value="Login"
                onClick={(e) => {
                  e.preventDefault();
                  login(username, password);
                }}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  token: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(loginAction(username, password)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
