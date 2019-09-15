import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles/VolumeSlider.m.css';

const VolumeSlider = ({ value, onVolumeUpdate }) => {
  const [volume, setVolume] = useState(value);

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
        onClick={(event) => {
          const bar = event.currentTarget.getBoundingClientRect();
          const val = 1 - (event.clientY - bar.top) / bar.height;

          if (typeof onVolumeUpdate === 'function') {
            onVolumeUpdate(val);
          }

          setVolume(val);
        }}
      >
        <div className={styles.bar} />
        <div className={styles.activeBar} style={{ height: `${100 * volume}%` }} />
      </div>
    </div>
  );
};

VolumeSlider.defaultProps = {
  onVolumeUpdate: null,
};

VolumeSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onVolumeUpdate: PropTypes.func,
};

export default VolumeSlider;
