import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './layouts/Timeline.module.css';

const Timeline = ({ currentTime, duration, onChange }) => (
  <div className={styles.timeline}>
    <div className={styles.timePassed}>{moment(currentTime * 1000).format('mm:ss')}</div>
    <div
      className={styles.progressWrapper}
      role="slider"
      aria-valuemax={duration}
      aria-valuemin={0}
      aria-valuenow={currentTime}
      tabIndex={-1}
      onKeyDown={null}
      onClick={(e) => {
        if (typeof onChange === 'function') {
          const r = e.currentTarget.getBoundingClientRect();
          onChange(duration * (e.clientX - r.left) / r.width);
        }
      }}
    >
      <div className={styles.progressBackground}>
        <div
          className={styles.progressBar}
          style={{ width: `${currentTime > duration ? '100%' : `${currentTime / duration * 100}%`}` }}
        />
      </div>
    </div>
    <div className={styles.duration}>{moment(duration * 1000).format('mm:ss')}</div>
  </div>
);

Timeline.defaultProps = {
  onChange: null,
};

Timeline.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default Timeline;
