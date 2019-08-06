import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './layouts/Timeline.module.css';

class Timeline extends PureComponent {
  onClick(e) {
    const { duration, onChange } = this.props;

    const r = e.currentTarget.getBoundingClientRect();
    const value = (e.clientX - r.left) / r.width;

    onChange(duration * value);
  }

  render() {
    const { currentTime, duration } = this.props;

    return (
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
          onClick={this.onClick.bind(this)}
        >
          <div className={styles.progressBackground}>
            <div className={styles.progressBar} style={{ width: `${currentTime / duration * 100}%` }} />
          </div>
        </div>
        <div className={styles.duration}>{moment(duration * 1000).format('mm:ss')}</div>
      </div>
    );
  }
}

Timeline.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Timeline;
