import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './layouts/Login.module.css';
import inputStyles from '../../layouts/Input.module.css';
import linkStyles from '../../layouts/Link.module.css';

const Login = () => (
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
        />
      </label>
      <label htmlFor="password" className={styles.inputWrapper}>
        <input
          id="password"
          className={inputStyles.input}
          type="password"
          placeholder="Password"
        />
      </label>
      <div className={styles.footer}>
        <Link className={linkStyles.link} to="/forgot">Forgot your password?</Link>
        <div>
          <Link className={`${linkStyles.link} ${styles.marginRight}`} to="/register">Need an account?</Link>
          <input className={inputStyles.button} type="submit" value="Login" />
        </div>
      </div>
    </form>
  </div>
);

export default connect()(Login);
