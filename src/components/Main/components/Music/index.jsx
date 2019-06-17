import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Song from './components/Song';

import styles from './music.module.css';

const Music = ({ songs }) => (
  <section className={styles.music}>
    <h1 className={styles.title}>All</h1>
    <div className={styles.songList}>
      {songs.map((song, i) => (
        <Song key={song.uuid} author={song.author} title={song.title} cover={song.cover} i={i} />
      ))}
    </div>
  </section>
);

Music.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    cover: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = store => ({
  songs: store.player.songs,
});

export default connect(mapStateToProps)(Music);
