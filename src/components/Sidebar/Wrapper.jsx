import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import css from './css/Wrapper.module.css';

const Wrapper = ({ visible, children }) => (
  <CSSTransition in={visible} classNames={{ ...css }} mountOnEnter unmountOnExit timeout={200}>
    <div className={css.wrapper}>
      {children}
    </div>
  </CSSTransition>
);

Wrapper.defaultProps = {
  visible: false,
};

Wrapper.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Wrapper;
