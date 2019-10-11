import React from 'react';
import { useMedia } from 'react-use';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';
import Modal from '../Modal';
import BackgroundPicture from '../BackgroundPicture';
import Header from '../Header';
import Player from '../Player';

import css from './css/Layout.module.css';

const Layout = ({ children, token }) => {
  const isMobile = useMedia('(max-width: 640px)');

  return (
    <>
      {isMobile && <Sidebar />}
      <main className={css.app}>
        <BackgroundPicture />
        <div className={css.content}>
          <Header />
          {children}
        </div>
        {token && <Player />}
      </main>
      <Modal />
    </>
  );
};

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  token: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(Layout);
