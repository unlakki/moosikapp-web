import React from 'react';
import { Link } from 'react-router-dom';

import styles from './layouts/Register.module.css';
import inputStyles from '../../layouts/Input.module.css';
import linkStyles from '../../layouts/Link.module.css';

const Register = () => (
  <div className={styles.register}>
    <h1 className={styles.title}>Register</h1>
    <form className={styles.main}>
      <label htmlFor="username" className={styles.inputWrapper}>
        <input
          id="username"
          className={inputStyles.input}
          type="text"
          placeholder="Username"
          autoComplete="off"
        />
      </label>
      <label htmlFor="email" className={styles.inputWrapper}>
        <input
          id="email"
          className={inputStyles.input}
          type="email"
          placeholder="Email"
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
      <label htmlFor="retry" className={styles.inputWrapper}>
        <input
          id="retry"
          className={inputStyles.input}
          type="password"
          placeholder="Re-type password"
        />
      </label>
      <div className={styles.footer}>
        <Link className={`${linkStyles.link} ${styles.marginRight}`} to="/login">Already have account?</Link>
        <input className={inputStyles.button} type="submit" value="Register" />
      </div>
    </form>
  </div>
);

export default Register;
