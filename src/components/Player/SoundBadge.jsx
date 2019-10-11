import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import css from './css/SoundBadge.module.css';

const SoundBadge = ({ author, title, cover }) => (
  <div className={css.soundBadge}>
    <div className={css.cover} style={{ backgroundImage: cover ? `url(${cover})` : '' }} />
    <div className={css.container}>
      <span className={classnames(css.truncate, css.title)}>{title}</span>
      <span className={classnames(css.truncate, css.author)}>{author}</span>
    </div>
  </div>
);

SoundBadge.defaultProps = {
  author: 'No Author',
  title: 'No Title',
  cover: null,
};

SoundBadge.propTypes = {
  author: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
};

export default SoundBadge;
