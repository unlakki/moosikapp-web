import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './styles/Timeline.m.css';

const Timeline = ({ currentTime, duration, onTimeUpdate }) => (
  <div className={styles.wrapper}>
    <span className={styles.time}>{moment(currentTime * 1000).format('mm:ss')}</span>
    <div
      className={styles.progressWrapper}
      role="slider"
      aria-valuemax={duration}
      aria-valuemin={0}
      aria-valuenow={currentTime}
      tabIndex={-1}
      onKeyDown={null}
      onClick={(event) => {
        if (typeof onTimeUpdate === 'function') {
          const timeline = event.currentTarget.getBoundingClientRect();
          onTimeUpdate(duration * (event.clientX - timeline.left) / timeline.width);
        }
      }}
    >
      <div className={styles.progressBar}>
        <div
          className={styles.progressActive}
          style={{
            width: `${currentTime > duration ? '100%' : `${currentTime / duration * 100}%`}`,
          }}
        />
      </div>
    </div>
    <span className={styles.time}>{moment(duration * 1000).format('mm:ss')}</span>
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
