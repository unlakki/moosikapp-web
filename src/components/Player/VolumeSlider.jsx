import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './layouts/VolumeSlider.module.css';

const VolumeSlider = ({ value, onChange }) => {
  const [volume, setVolume] = useState(value);

  const updateVolume = (v) => {
    setVolume(v);
    if (typeof onChange === 'function') {
      onChange(v);
    }
  };

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
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          updateVolume(1 - (e.clientY - r.top) / r.height);
        }}
      >
        <div className={styles.background} />
        <div className={styles.bar} style={{ height: `${100 * volume}%` }} />
      </div>
    </div>
  );
};

VolumeSlider.defaultProps = {
  onChange: null,
};

VolumeSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default VolumeSlider;
