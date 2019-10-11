import React from 'react';
import classnames from 'classnames';
import uuidv4 from 'uuid/v4';
import { Link } from 'react-router-dom';
import Form from './Form';

import css from './css/Form.module.css';

export default () => {
  const uuids = {
    username: uuidv4(),
    password: uuidv4(),
  };

  return (
    <Form
      title="Login"
      body={(
        <>
          <div>
            <label htmlFor={uuids.username} className={css.label}>
              <input
                id={uuids.username}
                type="text"
                placeholder="Username"
                className={css.input}
              />
            </label>
            <label htmlFor={uuids.password} className={css.label}>
              <input
                id={uuids.password}
                type="password"
                placeholder="Password"
                className={css.input}
              />
            </label>
          </div>
          <div className={classnames(css.footer, css.spaceBetween)}>
            <Link to="/forgot" className={css.link}>Forgot your password?</Link>
            <div>
              <Link to="/register" className={css.link}>Need an account?</Link>
              <input type="submit" value="Login" className={css.submit} />
            </div>
          </div>
        </>
      )}
    />
  );
};
