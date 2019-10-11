import React from 'react';
import PropTypes from 'prop-types';

import css from './css/Form.module.css';

const Form = ({ title, body, onSubmit }) => (
  <div className={css.wrapper}>
    <form className={css.form} onSubmit={onSubmit}>
      <h1 className={css.title}>{title}</h1>
      {body}
    </form>
  </div>
);

Form.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
