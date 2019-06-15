import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import action from '../../../../actions/login';

import styles from './login.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null, password: null, error: null,
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

  login(e) {
    e.preventDefault();

    const { setToken, history } = this.props;

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
          this.setState({ error: message });
          return;
        }

        setToken(token);
        window.localStorage.setItem('token', token);
        history.push('/');
      })
      .catch(error => this.setState({ error: error.toString() }));
  }

  input(e) {
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
              id={uuids.username}
              className={styles.textInput}
              type="text"
              placeholder="Username / Email"
              onChange={this.input.bind(this)}
              onClick={this.reset.bind(this)}
            />
          </label>
          <label htmlFor={uuids.password} className={styles.field}>
            <input
              id={uuids.password}
              className={styles.textInput}
              type="password"
              placeholder="Password"
              onChange={this.input.bind(this)}
              onClick={this.reset.bind(this)}
            />
          </label>
          <div className={styles.field}>
            <Link className={styles.link} to="/forgot">Forgot your password?</Link>
            <div className={styles.right}>
              <Link className={styles.link} to="/register">Need an account?</Link>
              <input
                className={styles.submitButton}
                type="submit"
                value="Login"
                onClick={this.login.bind(this)}
              />
            </div>
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
