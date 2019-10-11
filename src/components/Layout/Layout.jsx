import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';
import Modal from '../Modal';
import BackgroundPicture from '../BackgroundPicture';
import Header from '../Header';
import Player from '../Player';

import css from './css/Layout.module.css';

const Layout = ({ children }) => (
  <>
    <Sidebar />
    <main className={css.app}>
      <BackgroundPicture />
      <div className={css.content}>
        <Header />
        {children}
      </div>
      <Player />
    </main>
    <Modal />
  </>
);

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Layout;
