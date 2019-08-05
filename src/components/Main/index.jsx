import React from 'react';
import Article from './Article';

import styles from './layouts/Main.module.css';

const lines = [
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus hic rem illum. Consequatur nihil rem laboriosam at excepturi impedit, itaque quam nemo libero eum. Omnis cum ipsam quod voluptatibus! Cum.',
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus hic rem illum. Consequatur nihil rem laboriosam at excepturi impedit, itaque quam nemo libero eum. Omnis cum ipsam quod voluptatibus! Cum.',
];

const Main = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Updates</h1>
    <div className={styles.articles}>
      <Article
        title="Lorem ipsum."
        text={lines}
        attachment="https://cdn.moosikapp.tk/v1/15ba5da8a27ee9565c2c9636bad4d994/azunyan.jpg"
        author={{ name: 'Hibikaze', image: 'https://cdn.moosikapp.tk/v1/15ba5da8a27ee9565c2c9636bad4d994/azunyan.jpg' }}
        date={new Date()}
      />
    </div>
  </div>
);

export default Main;
