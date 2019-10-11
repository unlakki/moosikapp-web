import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import Form from './Form';

import css from './css/Form.module.css';

const ForgotForm = ({ token, history }) => {
  useEffect(() => {
    if (token) {
      history.push('/');
    }
  });

  const uuids = {
    email: uuidv4(),
  };

  return (
    <Form
      title="Forgot"
      body={(
        <>
          <div className={css.note}>
            <p>To request a new password please enter your account email in the box below.</p>
            <p>We will send you an email with further instructions.</p>
          </div>
          <div>
            <label htmlFor={uuids.email} className={css.label}>
              <input id={uuids.email} type="email" placeholder="Email" className={css.input} />
            </label>
          </div>
          <div className={classnames(css.footer, css.flexEnd)}>
            <input type="submit" value="Request Password Change" className={css.submit} />
          </div>
        </>
      )}
    />
  );
};

ForgotForm.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default withRouter(connect(mapStateToProps)(ForgotForm));
