import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import styles from './layouts/Article.module.css';

const Article = ({ title, text, attachment }) => (
  <article className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.content}>
      {(typeof text === 'string') && <p>{text}</p>}
      {(typeof text === 'object') && text.map(block => <p key={uuidv4()}>{block}</p>)}
      <img src={attachment} alt={title} />
    </div>
  </article>
);

Article.defaultProps = {
  attachment: '',
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  attachment: PropTypes.string,
};

export default Article;
