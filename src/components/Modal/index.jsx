import React from 'react';

import styles from './layouts/Modal.module.css';

const Modal = ({ show = false }) => (
  <div className={styles.wrapper} style={{ display: show ? '' : 'none' }}>
    <div className={styles.modal}>
      MESSAGE
    </div>
  </div>
);

export default Modal;
