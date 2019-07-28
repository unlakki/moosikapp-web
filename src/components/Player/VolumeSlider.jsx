import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './layouts/VolumeSlider.module.css';

class VolumeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value };
  }

  onClick(e) {
    const { onChange } = this.props;

    const r = e.currentTarget.getBoundingClientRect();
    const value = 1 - (e.clientY - r.top) / r.height;

    this.setState({ value });
    onChange(value);
  }

  render() {
    const { value } = this.state;

    return (
      <div className={styles.wrapper}>
        <div
          className={styles.slider}
          role="slider"
          aria-valuemax={1}
          aria-valuemin={0}
          aria-valuenow={value}
          tabIndex={-1}
          onKeyDown={null}
          onClick={this.onClick.bind(this)}
        >
          <div className={styles.background} />
          <div className={styles.bar} style={{ height: `${100 * value}%` }} />
        </div>
      </div>
    );
  }
}

VolumeSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default VolumeSlider;
