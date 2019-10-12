import React from 'react';
import Music from './Music';

import css from './css/Music.module.css';

const Search = () => (
  <Music>
    <form className={css.searchForm}>
      <input className={css.input} type="text" placeholder="Search" />
      <input className={css.submit} type="submit" value="Search" />
    </form>
    <div className={css.songs}>Search</div>
  </Music>
);

export default Search;
