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

const Timeline = ({ time, duration, seek }) => (
  <div className={css.wrapper}>
    <span className={css.time}>{moment(time * 1000).format('mm:ss')}</span>
    <div
      className={css.progressWrapper}
      role="slider"
      aria-valuemax={duration}
      aria-valuemin={0}
      aria-valuenow={time}
      tabIndex={-1}
      onKeyDown={null}
      onClick={timelineFunc(duration, seek)}
    >
      <div className={css.progressBar}>
        <div
          className={css.progressActive}
          style={{
            width: `${time > duration
              ? '100%'
              : `${time / duration * 100}%`}`,
          }}
        />
      </div>
    </div>
    <span className={css.time}>{moment(duration * 1000).format('mm:ss')}</span>
  </div>
);

Timeline.defaultProps = {
  seek: null,
};

Timeline.propTypes = {
  time: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  seek: PropTypes.func,
};

export default Timeline;
