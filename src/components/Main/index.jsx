import React from 'react';
import Article from './Article';

import styles from './layouts/Main.module.css';

const lyrics = [
  'А знаешь все мечты такие сладкие на вкус...и цвет.',
  'И выше неба ты мне улыбнись, я улыбнусь в ответ.',
  'Давай полетаем что ли,',
  'Это так легко ли,',
  'Не волнуйся я держу.',
  'Давай про гуляем школу',
  'Обещаю что я',
  'Никому не расскажу.',
  'Давай полетаем что ли,',
  'Облака сквозь шторы, как обертки от конфет.',
  'Давай про гуляем школу,',
  'И закажем с колой кучу счастья на десерт.',
];

const Main = () => (
  <div className={styles.articles}>
    <Article
      title="Nya? Nya!"
      text={lyrics}
      attachment="https://cdn.moosikapp.tk/v1/15ba5da8a27ee9565c2c9636bad4d994/azunyan.jpg"
    />
  </div>
);

export default Main;
