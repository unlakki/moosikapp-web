import React from 'react';

import styles from '../layouts/SongList.module.css';
import inputStyles from '../../../layouts/Input.module.css';

const Find = () => (
  <div className={styles.wrapper}>
    <form className={styles.findBox}>
      <input className={`${inputStyles.input} ${styles.findInput}`} type="text" placeholder="Search" />
      <input className={inputStyles.button} type="submit" value="Search" />
    </form>
    <div className={styles.songList}>
      SONGS
    </div>
  </div>
);

export default Find;
