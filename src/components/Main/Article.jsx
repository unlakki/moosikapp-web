import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

import styles from './layouts/Article.module.css';

const Article = ({
  title, text, attachment, author, date,
}) => (
  <article className={styles.container}>
    <div className={styles.header}>
      <div className={styles.meta}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.date}>{moment(date).fromNow()}</span>
      </div>
      <div className={styles.author}>
        <span className={styles.authorName}>{author.name}</span>
        <img className={styles.authorImage} src={author.image} alt={author.name} />
      </div>
    </div>
    <div className={styles.content}>
      {attachment && <img className={styles.attachment} src={attachment} alt={title} />}
      {(typeof text === 'string') && <p>{text}</p>}
      {(typeof text === 'object') && text.map(block => <p key={uuidv4()}>{block}</p>)}
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
  author: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  date: PropTypes.number.isRequired,
};

export default Article;
