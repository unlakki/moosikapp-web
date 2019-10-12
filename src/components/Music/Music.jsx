import React from 'react';
import PropTypes from 'prop-types';
import Subnav from './Subnav';

import css from './css/Music.module.css';

const Music = ({ children }) => (
  <section className={css.section}>
    <Subnav />
    <div className={css.container}>
      {children}
    </div>
  </section>
);

Music.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Music;
