import React from 'react';
import { useMedia } from 'react-use';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Navigation from './Navigation';
import NavLink from './NavLink';
import NavButton from './NavButton';
import { logout as logoutAction } from '../../actions/login';

import css from './css/Header.module.css';

const logoutFunc = func => (event) => {
  event.preventDefault();
  func();
  window.localStorage.removeItem('token');
};

const Header = ({ token, logout }) => {
  const isMobile = useMedia('(max-width: 640px)');

  return (
    <header className={css.header}>
      <div className={css.group}>
        <Link to="/">
          <Logo />
        </Link>
        {(!isMobile && token) && <Navigation />}
      </div>
      {!isMobile && (
        <div className={css.group}>
          {!token ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <NavLink to="?logout" onClick={logoutFunc(logout)}>Logout</NavLink>
          )}
        </div>
      )}
      {isMobile && <NavButton />}
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
