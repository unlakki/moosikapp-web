import React from 'react';
import PropTypes from 'prop-types';

import styles from './layouts/Article.module.css';

const Article = ({ title, text, image }) => (
  <article className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.content}>
      {(typeof text === 'string') && <p>{text}</p>}
      {(typeof text === 'object') && text.map(block => <p>{block}</p>)}
      <img src={image} alt={title} />
    </div>
  </article>
);

Article.defaultProps = {
  image: '',
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  image: PropTypes.string,
};

export default Article;
