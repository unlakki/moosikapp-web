import React, { useState } from 'react';
import PropTypes from 'prop-types';

import css from './css/VolumeSlider.module.css';

const volumeFunc = (set, update) => (event) => {
  const el = event.currentTarget.getBoundingClientRect();
  const value = 1 - (event.clientY - el.top) / el.height;

  if (typeof onVolumeUpdate === 'function') {
    update(value);
  }

  set(value);
};

const VolumeSlider = ({ value, onVolumeUpdate }) => {
  const [volume, setVolume] = useState(value);

  return (
    <div className={css.wrapper}>
      <div
        className={css.slider}
        role="slider"
        aria-valuemax={1}
        aria-valuemin={0}
        aria-valuenow={value}
        tabIndex={-1}
        onKeyDown={null}
        onClick={volumeFunc(setVolume, onVolumeUpdate)}
      >
        <div className={css.bar} />
        <div className={css.activeBar} style={{ height: `${100 * volume}%` }} />
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
