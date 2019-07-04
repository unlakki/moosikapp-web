import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import action from '../../actions/error';

import styles from './error.module.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 0, right: '-320px',
    };
  }

  componentDidMount() {
    const { clearError } = this.props;

    setTimeout(() => {
      this.setState({ opacity: 1, right: 0 });
    }, 200);

    setTimeout(() => {
      this.setState({ opacity: 0, right: '-320px' });
    }, 4800);

    setTimeout(() => {
      clearError();
    }, 5000);
  }

  render() {
    const { error } = this.props;

    const { opacity, right } = this.state;

    return (
      <div className={styles.errorMessage} style={{ opacity, right }}>
        <svg className={styles.icon} viewBox="0 0 24 24">
          <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
        </svg>
        <div className={styles.messageBox}>
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
