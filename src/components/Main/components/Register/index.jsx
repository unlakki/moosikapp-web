import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import styles from './register.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.username = createRef();
    this.email = createRef();
    this.password = createRef();
    this.retry = createRef();

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

  register(e) {
    e.preventDefault();

    const { history } = this.props;

    const username = this.username.current.value;
    const email = this.username.current.value;
    const password = this.password.current.value;
    const retry = this.username.current.value;

    if (!/[a-zA-Z0-9\-_]/.test(username)) {
      this.setState({
        error: 'Username must contain only English characters, numbers, dot, dash or underline.',
      });
      return;
    }

    if (password.length < 8) {
      this.setState({
        error: 'Password too short. Use 8 or more characters.',
      });
      return;
    }

    if (password !== retry) {
      this.setState({ error: 'Passwords don\'t match.' });
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
          this.setState({ error: message });
          return;
        }

        history.push('/login');
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
      <section className={styles.register}>
        <h1 className={styles.head}>Register</h1>
        <form className={styles.body}>
          <label htmlFor={uuids.username} className={styles.field}>
            <input
              ref={this.username}
              id={uuids.username}
              className={styles.textInput}
              type="text"
              placeholder="Username"
              onClick={this.reset.bind(this)}
            />
          </label>
          <label htmlFor={uuids.email} className={styles.field}>
            <input
              ref={this.email}
              id={uuids.email}
              className={styles.textInput}
              type="email"
              placeholder="Email"
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
          <label htmlFor={uuids.retry} className={styles.field}>
            <input
              ref={this.retry}
              id={uuids.retry}
              className={styles.textInput}
              type="password"
              placeholder="Re-type Password"
              onClick={this.reset.bind(this)}
            />
          </label>
          <div className={styles.field}>
            <Link className={styles.link} to="/login">Already have account?</Link>
            <input
              className={styles.submitButton}
              type="submit"
              value="Register"
              onClick={this.register.bind(this)}
            />
          </div>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </section>
    );
  }
}

Register.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(withRouter(Register));
