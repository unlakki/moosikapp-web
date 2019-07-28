import React from 'react';
import Song from '../Song';

import styles from '../layouts/SongList.module.css';

const songs = [
  {
    uuid: '1',
    author: 'Author',
    title: 'Title',
    cover: 'https://cdn.moosikapp.tk/v1/15ba5da8a27ee9565c2c9636bad4d994/azunyan.jpg',
    edit: true,
    favorite: true,
  },
  {
    uuid: '2',
    author: 'Author',
    title: 'Title',
    cover: 'https://cdn.moosikapp.tk/v1/15ba5da8a27ee9565c2c9636bad4d994/azunyan.jpg',
    edit: true,
    favorite: true,
  },
  {
    uuid: '3',
    author: 'Author',
    title: 'Title',
    cover: 'https://cdn.moosikapp.tk/v1/15ba5da8a27ee9565c2c9636bad4d994/azunyan.jpg',
    edit: true,
    favorite: true,
  },
];

const All = () => (
  <div className={styles.songList}>
    {songs.map(({
      uuid, author, title, cover, edit, favorite,
    }) => (
      <Song
        key={uuid}
        author={author}
        title={title}
        cover={cover}
        edit={edit}
        favorite={favorite}
      />
    ))}
  </div>
);

export default All;
