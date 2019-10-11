import React from 'react';
import classnames from 'classnames';
import uuidv4 from 'uuid/v4';
import Form from './Form';

import css from './css/Form.module.css';

export default () => {
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
