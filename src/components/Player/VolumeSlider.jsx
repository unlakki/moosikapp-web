import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import css from './css/VolumeSlider.module.css';

const volumeFunc = (set, update) => (event) => {
  const el = event.currentTarget.getBoundingClientRect();
  const value = 1 - (event.clientY - el.top) / el.height;

  if (typeof update === 'function') {
    update(value);
  }

  set(value);
};

const VolumeSlider = ({ show, value, onVolumeUpdate }) => {
  const [volume, setVolume] = useState(value);

  return (
    <CSSTransition
      in={show}
      classNames={{ ...css }}
      mountOnEnter
      unmountOnExit
      timeout={200}
    >
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
    </CSSTransition>
  );
};

VolumeSlider.defaultProps = {
  onVolumeUpdate: null,
};

VolumeSlider.propTypes = {
  show: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  onVolumeUpdate: PropTypes.func,
};

export default VolumeSlider;
