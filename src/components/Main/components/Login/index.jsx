import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import action from '../../../../actions/login';
import errAction from '../../../../actions/error';

import styles from './login.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '', password: '',
    };

    this.uuids = {
      username: uuidv4(), password: uuidv4(),
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

    const { username, password } = this.uuids;

    const { id, value } = e.target;
    switch (id) {
      case username:
        this.setState({ username: value });
        break;
      case password:
        this.setState({ password: value });
        break;
      default:
    }
  }

  login(e) {
    e.preventDefault();

    const { setToken, history, setError } = this.props;

    const { username, password } = this.state;

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
          setError(message);
          return;
        }

        setToken(token);
        window.localStorage.setItem('token', token);
        history.push('/');
      })
      .catch((error) => {
        setError(error.toString());
      });
  }

  render() {
    const { uuids } = this;

    return (
      <section className={styles.login}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.main}>
          <label htmlFor={uuids.username} className={styles.inputWrapper}>
            <input
              id={uuids.username}
              className={styles.input}
              type="text"
              placeholder="Username / Email"
              onChange={this.onInput.bind(this)}
            />
          </label>
          <label htmlFor={uuids.password} className={styles.inputWrapper}>
            <input
              id={uuids.password}
              className={styles.input}
              type="password"
              placeholder="Password"
              onChange={this.onInput.bind(this)}
            />
          </label>
          <div className={styles.inputWrapper}>
            <Link className={styles.link} to="/forgot">Forgot your password?</Link>
            <div className={styles.right}>
              <Link className={styles.link} to="/register">Need an account?</Link>
              <input
                className={styles.submit}
                type="submit"
                value="Login"
                onClick={this.login.bind(this)}
              />
            </div>
          </div>
        </form>
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
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(action(token)),
  setError: message => dispatch(errAction(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
