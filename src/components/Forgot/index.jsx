import React from 'react';

import styles from './layouts/Forgot.module.css';
import inputStyles from '../../layouts/Input.module.css';

const Forgot = () => (
  <div className={styles.forgot}>
    <h1 className={styles.title}>Forgot</h1>
    <div className={styles.note}>
      <p>To request a new password please enter your account email in the box below.</p>
      <p>We will send you an email with further instructions.</p>
    </div>
    <form className={styles.main}>
      <label htmlFor="email" className={styles.inputWrapper}>
        <input
          id="email"
          className={inputStyles.input}
          type="email"
          placeholder="Email"
          autoComplete="off"
        />
      </label>
      <div className={styles.footer}>
        <input className={inputStyles.button} type="submit" value="Request Password Change" />
      </div>
    </form>
  </div>
);

export default Forgot;
