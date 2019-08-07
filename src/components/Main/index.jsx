import React from 'react';
import Article from './Article';

import styles from './layouts/Main.module.css';

const article1 = {
  title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  content: [
    'https://sun9-24.userapi.com/c858328/v858328601/2dcf1/64dBzUz-gO0.jpg',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus hic rem illum.',
    'Consequatur nihil rem laboriosam at excepturi impedit, itaque quam nemo libero eum.',
    'https://pp.userapi.com/c858328/v858328601/2dce7/PTZSqKR2eg8.jpg',
    'Omnis cum ipsam quod voluptatibus! Cum.',
  ],
  author: {
    username: 'Hibikaze',
    image: 'https://pp.userapi.com/c850120/v850120001/1ad28c/F35G1gFJG24.jpg',
  },
  date: Date.now(),
};

const article2 = {
  title: 'Lorem ipsum.',
  content: [
    'https://sun9-6.userapi.com/c850220/v850220268/19d5f8/RIJmY1ish6g.jpg',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus hic rem illum.',
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
    <Article {...article1} />
    <Article {...article2} />
  </div>
);

export default Main;
