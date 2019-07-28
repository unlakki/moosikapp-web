import React from 'react';
import Article from './Article';

import styles from './layouts/Main.module.css';

const Main = () => (
  <div className={styles.articles}>
    <Article
      title="Nya?"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit natus aspernatur, cumque nulla ab voluptate exercitationem repudiandae, illum officiis dicta architecto provident nam eos voluptatibus consequuntur veniam consequatur. Fugit, sunt."
      image="https://cdn.moosikapp.tk/v1/15ba5da8a27ee9565c2c9636bad4d994/azunyan.jpg"
    />
  </div>
);

export default Main;
