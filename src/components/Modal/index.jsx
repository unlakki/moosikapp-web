import React from 'react';
import PropTypes from 'prop-types';

import styles from './layouts/Modal.module.css';

const Modal = ({ show = false }) => (
  <div className={styles.wrapper} style={{ display: show ? '' : 'none' }}>
    <div className={styles.modal}>
      MESSAGE
    </div>
  </div>
);

Modal.propTypes = {
  show: PropTypes.func.isRequired,
};

export default Modal;
