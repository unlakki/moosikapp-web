import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './player.module.css';

const Player = ({ token }) => (
  <section className={styles.player}>
    {token}
  </section>
);

Player.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
