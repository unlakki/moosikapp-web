import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Subnav from './Subnav';

import css from './css/Music.module.css';

const Music = ({ children, token, history }) => {
  useEffect(() => {
    if (!token) {
      history.push('/');
    }
  });

  return (
    <section className={css.section}>
      <Subnav />
      <div className={css.wrapper}>
        {children}
      </div>
    </section>
  );
};

Music.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default withRouter(connect(mapStateToProps)(Music));
