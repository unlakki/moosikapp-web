import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import css from './css/Timeline.module.css';

const timelineFunc = (duration, update) => (event) => {
  if (typeof update === 'function') {
    const timeline = event.currentTarget.getBoundingClientRect();
    update(duration * (event.clientX - timeline.left) / timeline.width);
  }
};

const Timeline = ({ currentTime, duration, onTimeUpdate }) => (
  <div className={css.wrapper}>
    <span className={css.time}>{moment(currentTime * 1000).format('mm:ss')}</span>
    <div
      className={css.progressWrapper}
      role="slider"
      aria-valuemax={duration}
      aria-valuemin={0}
      aria-valuenow={currentTime}
      tabIndex={-1}
      onKeyDown={null}
      onClick={timelineFunc(duration, onTimeUpdate)}
    >
      <div className={css.progressBar}>
        <div
          className={css.progressActive}
          style={{
            width: `${currentTime > duration
              ? '100%'
              : `${currentTime / duration * 100}%`}`,
          }}
        />
      </div>
    </div>
    <span className={css.time}>{moment(duration * 1000).format('mm:ss')}</span>
  </div>
);

Timeline.defaultProps = {
  onTimeUpdate: null,
};

Timeline.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onTimeUpdate: PropTypes.func,
};

export default Timeline;
