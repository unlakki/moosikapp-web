import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import errAction from '../../../../actions/error';

import styles from './register.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '', email: '', password: '', retry: '',
    };

    this.uuids = {
      username: uuidv4(), email: uuidv4(), password: uuidv4(), retry: uuidv4(),
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

    const {
      username, email, password, retry,
    } = this.uuids;

    const { id, value } = e.target;
    switch (id) {
      case username:
        this.setState({ username: value });
        break;
      case email:
        this.setState({ email: value });
        break;
      case password:
        this.setState({ password: value });
        break;
      case retry:
        this.setState({ retry: value });
        break;
      default:
    }
  }

  register(e) {
    e.preventDefault();

    const { history, setError } = this.props;

    const {
      username, email, password, retry,
    } = this.state;

    if (!/[a-zA-Z0-9\-_]/.test(username)) {
      setError('Username must contain only English characters, numbers, dot, dash or underline.');
      return;
    }

    if (!/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(email)) {
      setError('Invalid email.');
      return;
    }

    if (password.length < 8) {
      setError('Password too short. Use 8 or more characters.');
      return;
    }

    if (password !== retry) {
      setError('Passwords don\'t match.');
      return;
    }

    fetch(`${REACT_APP_API_URL}/api/register`, {
      method: 'POST',
      headers: {
        accept: 'application/vnd.moosik.v1+json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then(res => res.json())
      .then((res) => {
        const { uuid, message } = res;

        if (!uuid) {
          setError(message);
          return;
        }

        history.push('/login');
      })
      .catch((error) => {
        setError(error.toString());
      });
  }

  render() {
    const { uuids } = this;

    return (
      <section className={styles.register}>
        <h1 className={styles.title}>Register</h1>
        <form className={styles.body}>
          <label htmlFor={uuids.username} className={styles.inputWrapper}>
            <input
              ref={this.username}
              id={uuids.username}
              className={styles.input}
              type="text"
              placeholder="Username"
              onChange={this.onInput.bind(this)}
            />
          </label>
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
          <label htmlFor={uuids.password} className={styles.inputWrapper}>
            <input
              ref={this.password}
              id={uuids.password}
              className={styles.input}
              type="password"
              placeholder="Password"
              onChange={this.onInput.bind(this)}
            />
          </label>
          <label htmlFor={uuids.retry} className={styles.inputWrapper}>
            <input
              ref={this.retry}
              id={uuids.retry}
              className={styles.input}
              type="password"
              placeholder="Re-type Password"
              onChange={this.onInput.bind(this)}
            />
          </label>
          <div className={styles.inputWrapper}>
            <Link className={styles.link} to="/login">Already have account?</Link>
            <input
              className={styles.submit}
              type="submit"
              value="Register"
              onClick={this.register.bind(this)}
            />
          </div>
        </form>
      </section>
    );
  }
}

Register.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
