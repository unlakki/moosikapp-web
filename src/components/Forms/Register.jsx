import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import Form from './Form';

import css from './css/Form.module.css';

const RegisterForm = ({ token, history }) => {
  useEffect(() => {
    if (token) {
      history.push('/');
    }
  });

  const uuids = {
    username: uuidv4(),
    email: uuidv4(),
    password: uuidv4(),
    retryPassword: uuidv4(),
  };

  return (
    <Form
      title="Register"
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
            <label htmlFor={uuids.email} className={css.label}>
              <input id={uuids.email} type="email" placeholder="Email" className={css.input} />
            </label>
            <label htmlFor={uuids.password} className={css.label}>
              <input
                id={uuids.password}
                type="password"
                placeholder="Password"
                className={css.input}
              />
            </label>
            <label htmlFor={uuids.retryPassword} className={css.label}>
              <input
                id={uuids.retryPassword}
                type="password"
                placeholder="Re-type password"
                className={css.input}
              />
            </label>
          </div>
          <div className={classnames(css.footer, css.flexEnd)}>
            <div>
              <Link to="/login" className={css.link}>Already have account?</Link>
              <input type="submit" value="Register" className={css.submit} />
            </div>
          </div>
        </>
      )}
    />
  );
};

RegisterForm.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default withRouter(connect(mapStateToProps)(RegisterForm));
