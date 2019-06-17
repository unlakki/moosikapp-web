import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action from '../../actions/error';

import styles from './modal.module.css';

class Modal extends React.Component {
  componentDidMount() {
    const { clearError } = this.props;

    setTimeout(() => {
      clearError();
    }, 5000);
  }

  render() {
    const { error } = this.props;

    return (
      <div className={styles.modal}>
        <svg className={styles.icon} viewBox="0 0 24 24">
          <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>
        <div className={styles.message}>
          <span>{error}</span>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  error: PropTypes.string.isRequired,
  clearError: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(action('')),
});

export default connect(null, mapDispatchToProps)(Modal);
