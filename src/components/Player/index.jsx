import React from 'react';
import Timeline from './Timeline';
import VolumeSlider from './VolumeSlider';
import SoundBadge from './SoundBadge';

import styles from './layouts/Player.module.css';

import IconPack from './images/IconPack.svg';

const Player = () => (
  <div className={styles.wrapper}>
    <section className={styles.inner}>
      <div className={styles.controls}>
        <button type="button" className={styles.button} onClick={() => {}}>
          <svg className={styles.icon}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${IconPack}#prev`} />
          </svg>
        </button>
        <button type="button" className={styles.button} onClick={() => {}}>
          <svg className={styles.icon}>
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref={`${IconPack}#${true ? 'play' : 'pause'}`}
            />
          </svg>
        </button>
        <button type="button" className={styles.button} onClick={() => {}}>
          <svg className={styles.icon}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${IconPack}#next`} />
          </svg>
        </button>
        <button type="button" className={styles.button} onClick={() => {}}>
          <svg className={`${styles.icon} ${true ? styles.active : ''}`}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${IconPack}#repeat`} />
          </svg>
        </button>
        <button type="button" className={styles.button} onClick={() => {}}>
          <svg className={`${styles.icon} ${true ? styles.active : ''}`}>
            <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${IconPack}#shuffle`} />
          </svg>
        </button>
      </div>
      <Timeline currentTime={0} duration={0} onChange={() => {}} />
      <div className={`${styles.controls} ${styles.volume}`}>
        <button type="button" className={styles.button} onClick={() => {}}>
          <svg className={styles.icon}>
            <use
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xlinkHref={`${IconPack}#${true ? 'mute' : 'volume'}`}
            />
          </svg>
        </button>
        <VolumeSlider value={1} onChange={() => {}} />
      </div>
      <SoundBadge author="Author" title="Title" cover={null} />
      <audio />
    </section>
  </div>
);

export default Player;
