import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

import styles from './layouts/Article.module.css';

const Article = ({
  title, content, author, date,
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
      {content.map((line) => {
        if (/^https?:\/\/(\S+\.)+\w{2,4}\/.*/.test(line)) {
          return (
            <p style={{ textAlign: 'center' }}>
              <img className={styles.attachment} src={line} alt={line} />
            </p>
          );
        }

        return <p key={uuidv4()}>{line}</p>;
      })}
    </div>
  </article>
);

Article.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  author: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  date: PropTypes.number.isRequired,
};

export default Article;
