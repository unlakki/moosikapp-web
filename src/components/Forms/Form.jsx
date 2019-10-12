import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './css/Form.module.css';

const Form = ({
  title, body, onSubmit, token, history,
}) => {
  useEffect(() => {
    if (token) {
      history.push('/');
    }
  });

  return (
    <div className={css.wrapper}>
      <form className={css.form} onSubmit={onSubmit}>
        <h1 className={css.title}>{title}</h1>
        {body}
      </form>
    </div>
  );
};

Form.defaultProps = {
  onSubmit: null,
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onSubmit: PropTypes.func,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default withRouter(connect(mapStateToProps)(Form));
