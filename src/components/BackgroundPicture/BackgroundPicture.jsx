import React from 'react';
import css from './css/BackgroundPicture.module.css';

import webp from './images/bg.webp';
import jpg from './images/bg.jpg';

export default () => (
  <div className={css.wrapper}>
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img className={css.img} alt="background" src={jpg} />
    </picture>
  </div>
);
