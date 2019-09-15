import React from 'react';
import { wrapper, img } from './styles/BackgroundPicture.m.css';

import webp from './images/bg.webp';
import jpg from './images/bg.jpg';

export default () => (
  <div className={wrapper}>
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img className={img} alt="background" src={jpg} />
    </picture>
  </div>
);
