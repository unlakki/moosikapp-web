import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './timeline.module.css';

const Timeline = ({ timePassed, duration }) => (
  <div className={styles.timeline}>
    <div className={styles.timePassed}>{moment(timePassed * 1000).format('mm:ss')}</div>
    <div className={styles.progressWrapper}>
      <div className={styles.progressBackground}>
        <div className={styles.progressBar} style={{ width: `${timePassed / duration * 100}%` }} />
      </div>
    </div>
    <div className={styles.duration}>{moment(duration * 1000).format('mm:ss')}</div>
  </div>
);

Timeline.propTypes = {
  timePassed: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default Timeline;
