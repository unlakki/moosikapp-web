import React from 'react';
import Article from './Article';

import styles from './layouts/Main.module.css';

const article = {
  title: 'Lorem ipsum.',
  content: [
    'https://pp.userapi.com/c855736/v855736665/b09b5/EOFLOjVWWig.jpg',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus hic rem illum.',
    'https://sun9-18.userapi.com/c857524/v857524371/30b22/6z81CRl1-jk.jpg',
    'Consequatur nihil rem laboriosam at excepturi impedit, itaque quam nemo libero eum.',
    'Omnis cum ipsam quod voluptatibus! Cum.',
  ],
  author: {
    username: 'Hibikaze',
    image: 'https://pp.userapi.com/c850120/v850120001/1ad28c/F35G1gFJG24.jpg',
  },
  date: Date.now(),
};


const Main = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Updates</h1>
    <div className={styles.articles}>
      <Article {...article} />
    </div>
  </div>
);

export default Main;
